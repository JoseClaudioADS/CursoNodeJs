const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Pedido = require("./Pedido");
const Produto = require("./Produto");

const PedidoProdutos = sequelize.define(
  "PedidoProdutos",
  {
    id_pedido: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Pedido,
        key: "id",
      },
    },
    id_produto: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Produto,
        key: "id",
      },
    },
  },
  { tableName: "pedidos_produtos", timestamps: false }
);
Pedido.belongsToMany(Produto, {
  through: PedidoProdutos,
  foreignKey: "id_pedido",
});
Produto.belongsToMany(Pedido, {
  through: PedidoProdutos,
  foreignKey: "id_produto",
});

module.exports = PedidoProdutos;
