const express = require("express");
const PedidosController = require("../controllers/PedidosController");

const pedidosRouter = express.Router();

pedidosRouter.get("/", PedidosController.index);
pedidosRouter.get("/:id", PedidosController.show);
pedidosRouter.post("/", PedidosController.store);

module.exports = pedidosRouter;
