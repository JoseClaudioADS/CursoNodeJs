const express = require("express");
const UsuariosController = require("../controllers/UsuariosController");

const usuariosRouter = express.Router();

usuariosRouter.post("/", UsuariosController.store);

module.exports = usuariosRouter;
