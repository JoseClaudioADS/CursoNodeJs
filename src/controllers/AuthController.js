const Yup = require("yup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../entities/Usuario");
const BusinessException = require("../common/exceptions/BusinessException");

class AuthController {
  async login(req, res) {
    const validadorLogin = Yup.object().shape({
      email: Yup.string().email(),
      senha: Yup.string().required(),
    });

    await validadorLogin.validate(req.body, {
      abortEarly: false,
    });

    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (usuario) {
      const senhaConfere = await bcrypt.compare(senha, usuario.senha);

      const access_token = jwt.sign(
        {
          sub: usuario.email,
          nome: usuario.nome,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      if (senhaConfere) {
        res.json({
          access_token,
        });
      } else {
        throw new BusinessException("Login/Senha inválidos", "AUT_02");
      }
    } else {
      throw new BusinessException("Usuário não encontrado", "AUT_01");
    }
  }
}

module.exports = new AuthController();
