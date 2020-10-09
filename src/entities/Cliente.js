const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Cliente extends Model {}

Cliente.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "clientes",
  }
);

module.exports = Cliente;
