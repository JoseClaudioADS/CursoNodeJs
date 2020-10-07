const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const [, token] = authorization.split(" ");

    try {
      jwt.verify(token, process.env.JWT_SECRET);

      next();
    } catch (error) {
      res.status(401).json({
        details: "Token inválido",
      });
    }
  } else {
    res.status(401).json({
      details: "Token não fornecido",
    });
  }
};
