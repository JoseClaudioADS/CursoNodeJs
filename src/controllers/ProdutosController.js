const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");

const produtos = [];

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().required(),
  descricao: Yup.string().min(6).required(),
  valor: Yup.number().min(1).required(),
});

class ProdutosController {
  index(req, res) {
    res.json(produtos);
  }

  show(req, res) {
    const { id } = req.params;

    const produto = produtos.find((c) => c.id === id);

    if (produto) {
      res.json(produto);
    } else {
      res.sendStatus(404);
    }
  }

  async store(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { nome, descricao, valor } = req.body;

    const newId = uuidv4();

    const novoProduto = {
      id: newId,
      nome,
      descricao,
      valor,
    };

    produtos.push(novoProduto);

    res.send();
  }

  async update(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;

    const { nome, descricao, valor } = req.body;

    const indice = produtos.findIndex((c) => c.id === id);

    if (indice >= 0) {
      const produtoCadastrado = produtos[indice];

      const novasInformacoes = { descricao, valor, nome };

      Object.assign(produtoCadastrado, novasInformacoes);

      produtos[indice] = produtoCadastrado;

      res.send();
    } else {
      res.sendStatus(404);
    }
  }

  destroy(req, res) {
    const { id } = req.params;

    const indice = produtos.findIndex((c) => c.id === id);

    if (indice >= 0) {
      produtos.splice(indice, 1);
      res.send();
    } else {
      res.sendStatus(404);
    }
  }
}

module.exports = new ProdutosController();
