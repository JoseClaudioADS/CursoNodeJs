const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const BusinessException = require("../common/exceptions/BusinessException");

const clientes = [];

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().min(6).required(),
  email: Yup.string().email(),
});

class ClientesController {
  index(req, res) {
    res.json(clientes);
  }

  show(req, res) {
    const { id } = req.params;

    const cliente = clientes.find((c) => c.id === id);

    if (cliente) {
      res.json(cliente);
    } else {
      res.sendStatus(404);
    }
  }

  async store(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { nome, email } = req.body;

    const indice = clientes.findIndex((c) => c.email === email);
    if (indice >= 0) {
      throw new BusinessException("E-mail já utilizado", "CLI_01");
    }

    const newId = uuidv4();

    const novoCliente = {
      id: newId,
      nome,
      email,
    };

    clientes.push(novoCliente);

    res.send();
  }

  async update(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;

    const { nome, email } = req.body;

    const indice = clientes.findIndex((c) => c.id === id);

    if (indice >= 0) {
      const clienteCadastrado = clientes[indice];

      const novasInformacoes = { email, nome };

      Object.assign(clienteCadastrado, novasInformacoes);

      clientes[indice] = clienteCadastrado;

      res.send();
    } else {
      res.sendStatus(404);
    }
  }

  destroy(req, res) {
    const { id } = req.params;

    const indice = clientes.findIndex((c) => c.id === id);

    if (indice >= 0) {
      clientes.splice(indice, 1);
      res.send();
    } else {
      res.sendStatus(404);
    }
  }
}

module.exports = new ClientesController();
