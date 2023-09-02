const sequelize = require("sequelize");
const db = require("../config/db");
const Abonos = db.define(
  "abonos",
  {
    idAbonos: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCliente: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    idCredito: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    montoAbono: {
      type: sequelize.DECIMAL(10, 0),
      allowNull: false,
    },
    fechaAbono: {
      type: sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Abonos",
    timestamps: false,
  }
);

module.exports = Abonos;
