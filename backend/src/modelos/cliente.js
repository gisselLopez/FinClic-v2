const sequelize = require("sequelize");
const db = require("../config/db");
const Cliente = db.define(
  "cliente",
  {
    idCliente: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    Telefono: {
      type: sequelize.INTEGER(8),
      allowNull: false,
    },
    email: {
      type: sequelize.STRING(45),
      allowNull: false,
      unique: true,
    },
    DNI: {
      type: sequelize.BIGINT(13),
      allowNull: false,
    },
    Direccion: {
      type: sequelize.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "Cliente", // tal y como esta en la bd
    timestamps: false,
  }
);
module.exports = Cliente;
