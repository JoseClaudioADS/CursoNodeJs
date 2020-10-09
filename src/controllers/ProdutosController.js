const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const Produto = require("../entities/Produto");

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().required(),
  descricao: Yup.string().min(6).required(),
  valor: Yup.number().min(1).required(),
});

class ProdutosController {
  async index(req, res) {
    const result = await Produto.findAll();
    res.json(result);
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await Produto.findByPk(id);

    if (result) {
      res.json(result);
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

    await Produto.create({
      id: newId,
      nome,
      descricao,
      valor,
    });

    res.send();
  }

  async update(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if (produto) {
      const { nome, descricao, valor } = req.body;

      await produto.update({
        nome,
        descricao,
        valor,
      });

      res.send();
    } else {
      res.sendStatus(404);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if (produto) {
      await produto.destroy();
      res.send();
    } else {
      res.sendStatus(404);
    }
  }
}

module.exports = new ProdutosController();
