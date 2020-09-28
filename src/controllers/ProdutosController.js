const { v4: uuidv4 } = require("uuid");

const produtos = [];

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

  store(req, res) {
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

  update(req, res) {
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
