require("dotenv").config();
const express = require("express");
const { ValidationError } = require("yup");
const morgan = require("morgan");
require("express-async-errors");
const BusinessException = require("./common/exceptions/BusinessException");
const clientesRouter = require("./routes/clientesRouter");
const produtosRouter = require("./routes/produtosRouter");
const pedidosRouter = require("./routes/pedidosRouter");
const usuariosRouter = require("./routes/usuariosRouter");
const authRouter = require("./routes/authRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/clientes", clientesRouter);
app.use("/produtos", produtosRouter);
app.use("/pedidos", pedidosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  if (err instanceof BusinessException) {
    const errorDetail = {
      detail: [err.message],
      code: err.code,
      dateTime: new Date().toISOString(),
    };

    //BAD_REQUEST
    res.status(400).json(errorDetail);
  } else if (err instanceof ValidationError) {
    const errorDetail = {
      detail: err.errors,
      dateTime: new Date().toISOString(),
    };

    //BAD_REQUEST
    res.status(400).json(errorDetail);
  } else {
    //INTERNAL_SERVER_ERROR
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen("3000", () => {
  console.log("Servidor iniciou na porta 3000");
});
