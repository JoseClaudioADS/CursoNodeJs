const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const bcrypt = require("bcrypt");
const db = require("../config/db");
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

    const result = await db.query(
      `SELECT count(ID) FROM USUARIOS WHERE EMAIL = '${email}'`
    );

    if (result.rows[0].count > 0) {
      throw new BusinessException("E-mail já utilizado", "USU_01");
    }

    const newId = uuidv4();

    const senhaEncriptada = await bcrypt.hash(senha, 5);

    await db.query(
      `INSERT INTO USUARIOS (id, nome, email, senha) VALUES ('${newId}', '${nome}', '${email}', '${senhaEncriptada}')`
    );

    res.send();
  }
}

module.exports = new UsuariosController();
