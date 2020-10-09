const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");
class Usuario extends Model {}

Usuario.init(
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
    senha: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
  }
);

Usuario.beforeCreate(async (usuario, options) => {
  const senhaEncriptada = await bcrypt.hash(usuario.senha, 5);
  usuario.senha = senhaEncriptada;
});

module.exports = Usuario;
