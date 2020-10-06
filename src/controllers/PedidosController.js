const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const db = require("../config/db");

class PedidosController {
  async index(req, res) {
    const result = await db.query(`SELECT P.ID id, P.DATA_HORA dataHora, C.NOME nome 
    FROM PEDIDOS P INNER JOIN 
    CLIENTES C ON C.ID = P.ID_CLIENTE`);
    res.json(result.rows);
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await db.query(`SELECT DISTINCT P.ID ID, P.DATA_HORA data_hora, 
    C.NOME nome_cliente
    FROM PEDIDOS P 
    INNER JOIN CLIENTES C ON C.ID = P.ID_CLIENTE
    WHERE P.ID = '${id}'`);

    if (result.rowCount > 0) {
      const resultProdutos = await db.query(`
        SELECT P.NOME, P.VALOR
        FROM PEDIDOS_PRODUTOS PP 
        INNER JOIN PRODUTOS P ON P.ID = PP.ID_PRODUTO
        WHERE PP.ID_PEDIDO = '${id}'
      `);

      const pedido = result.rows[0];
      const produtos = resultProdutos.rows;
      pedido.produtos = produtos;

      const total = produtos.reduce((valorAnterior, produto) => {
        valorAnterior = +valorAnterior + +produto.valor;
        return valorAnterior;
      }, 0);

      pedido.total = total;

      res.json(pedido);
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

    await db.query(`INSERT INTO PEDIDOS (ID, ID_CLIENTE, DATA_HORA) VALUES 
    ('${newId}','${id_cliente}','${new Date().toISOString()}')`);

    const promisesProdutos = [];

    produtos.forEach((id_produto) => {
      promisesProdutos.push(
        db.query(`INSERT INTO PEDIDOS_PRODUTOS (ID_PEDIDO, ID_PRODUTO)
       VALUES ('${newId}', '${id_produto}')`)
      );
    });

    await Promise.all(promisesProdutos);

    res.send();
  }
}

module.exports = new PedidosController();
