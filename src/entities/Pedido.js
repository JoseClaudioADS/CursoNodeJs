const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Cliente = require("./Cliente");

class Pedido extends Model {}

Pedido.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.STRING,
      references: {
        model: Cliente,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Pedido",
    tableName: "pedidos",
    createdAt: "data_hora",
  }
);

Pedido.belongsTo(Cliente, {
  foreignKey: "id_cliente",
});

module.exports = Pedido;
