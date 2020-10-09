const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const Yup = require("yup");
const Cliente = require("../entities/Cliente");
const BusinessException = require("../common/exceptions/BusinessException");

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().min(6).required(),
  email: Yup.string().email(),
});

class ClientesController {
  async index(req, res) {
    const result = await Cliente.findAll();
    res.json(result);
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await Cliente.findByPk(id);

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

    const { nome, email } = req.body;

    const countPorEmail = await Cliente.count({
      where: {
        email,
      },
    });

    if (countPorEmail > 0) {
      throw new BusinessException("E-mail já utilizado", "CLI_01");
    }

    const newId = uuidv4();

    await Cliente.create({ id: newId, nome, email });

    res.send();
  }

  async update(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;

    const { nome, email } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (cliente) {
      const countByEmailIdDiferente = await Cliente.count({
        where: {
          email,
          id: {
            [Op.ne]: id,
          },
        },
      });

      if (countByEmailIdDiferente > 0) {
        throw new BusinessException("E-mail já utilizado", "CLI_01");
      }

      await Cliente.update(
        {
          email,
          nome,
        },
        {
          where: {
            id,
          },
        }
      );

      res.send();
    } else {
      res.sendStatus(404);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (cliente) {
      await cliente.destroy();

      res.send();
    } else {
      res.sendStatus(404);
    }
  }
}

module.exports = new ClientesController();
