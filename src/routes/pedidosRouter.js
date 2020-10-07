const express = require("express");
const PedidosController = require("../controllers/PedidosController");
const authMiddleware = require("../middlewares/auth");

const pedidosRouter = express.Router();

pedidosRouter.use(authMiddleware);

pedidosRouter.get("/", PedidosController.index);
pedidosRouter.get("/:id", PedidosController.show);
pedidosRouter.post("/", PedidosController.store);

module.exports = pedidosRouter;
