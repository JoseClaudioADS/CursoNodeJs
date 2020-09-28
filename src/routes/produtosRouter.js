const express = require("express");
const ProdutosController = require("../controllers/ProdutosController");

const produtosRouter = express.Router();

produtosRouter.get("/", ProdutosController.index);
produtosRouter.get("/:id", ProdutosController.show);
produtosRouter.post("/", ProdutosController.store);
produtosRouter.put("/:id", ProdutosController.update);
produtosRouter.delete("/:id", ProdutosController.destroy);

module.exports = produtosRouter;
