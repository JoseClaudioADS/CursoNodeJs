const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const Usuario = require("../entities/Usuario");
const BusinessException = require("../common/exceptions/BusinessException");

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().min(6).required(),
  email: Yup.string().email(),
  senha: Yup.string().required(),
});

class UsuariosController {
  async store(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { nome, email, senha } = req.body;

    const countPorEmail = await Usuario.count({
      where: {
        email,
      },
    });

    if (countPorEmail > 0) {
      throw new BusinessException("E-mail já utilizado", "USU_01");
    }

    const newId = uuidv4();

    await Usuario.create({ id: newId, nome, email, senha });

    res.send();
  }
}

module.exports = new UsuariosController();
