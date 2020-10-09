const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const db = require("../config/db");
const Cliente = require("../entities/Cliente");
const Pedido = require("../entities/Pedido");
const PedidoProdutos = require("../entities/PedidoProdutos");

class PedidosController {
  async index(req, res) {
    const result = await Pedido.findAll({ include: [Cliente] });
    res.json(result);
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await db.query(`SELECT DISTINCT P.ID ID, P.DATA_HORA data_hora, 
    C.NOME nome_cliente
    FROM PEDIDOS P 
    INNER JOIN CLIENTES C ON C.ID = P.ID_CLIENTE
    WHERE P.ID = '${id}'`);

    const pedido = result[0];

    if (pedido) {
      const resultProdutos = await db.query(`
        SELECT P.NOME, P.VALOR
        FROM PEDIDOS_PRODUTOS PP 
        INNER JOIN PRODUTOS P ON P.ID = PP.ID_PRODUTO
        WHERE PP.ID_PEDIDO = '${id}'
      `);

      const produtos = resultProdutos;

      const responsePedido = { ...pedido[0] };

      responsePedido.produtos = produtos[0];

      const total = produtos[0].reduce((valorAnterior, produto) => {
        valorAnterior = +valorAnterior + +produto.valor;
        return valorAnterior;
      }, 0);

      responsePedido.total = total;

      res.json(responsePedido);
    } else {
      res.sendStatus(404);
    }
  }

  async store(req, res) {
    const validadorDeSchema = Yup.object().shape({
      id_cliente: Yup.string().required(),
      produtos: Yup.array().required().min(1),
    });

    await validadorDeSchema.validate(req.body, {
      abortEarly: false,
    });

    const { id_cliente, produtos } = req.body;

    const newId = uuidv4();

    await Pedido.create({ id: newId, id_cliente });

    const promisesProdutos = [];

    produtos.forEach((id_produto) => {
      promisesProdutos.push(
        PedidoProdutos.create({ id_pedido: newId, id_produto })
      );
    });

    await Promise.all(promisesProdutos);

    res.send();
  }
}

module.exports = new PedidosController();
