const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Produto extends Model {}

Produto.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL(15, 2),
  },
  {
    sequelize,
    modelName: "Produto",
    tableName: "produtos",
  }
);

module.exports = Produto;
