const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const db = require("../config/db");

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().required(),
  descricao: Yup.string().min(6).required(),
  valor: Yup.number().min(1).required(),
});

class ProdutosController {
  async index(req, res) {
    const result = await db.query("SELECT * FROM PRODUTOS");
    res.json(result.rows);
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await db.query(`SELECT * FROM PRODUTOS WHERE ID = '${id}'`);

    if (result.rowCount > 0) {
      res.json(result.rows[0]);
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

    await db.query(`INSERT INTO PRODUTOS (ID, NOME, DESCRICAO, VALOR) VALUES 
    ('${newId}','${nome}','${descricao}','${valor}')`);

    res.send();
  }

  async update(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;

    const result = await db.query(
      `SELECT COUNT(ID) FROM PRODUTOS WHERE ID = '${id}'`
    );

    if (result.rows[0].count > 0) {
      const { nome, descricao, valor } = req.body;

      await db.query(`UPDATE PRODUTOS SET NOME = '${nome}', 
      DESCRICAO = '${descricao}', VALOR = '${valor}' WHERE ID = '${id}'`);

      res.send();
    } else {
      res.sendStatus(404);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    const result = await db.query(
      `SELECT COUNT(ID) FROM PRODUTOS WHERE ID = '${id}'`
    );

    if (result.rows[0].count > 0) {
      await db.query(`DELETE FROM PRODUTOS WHERE ID = '${id}'`);
      res.send();
    } else {
      res.sendStatus(404);
    }
  }
}

module.exports = new ProdutosController();
