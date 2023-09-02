const sequelize = require("sequelize");
const db = require("../config/db");
const Pagos = db.define(
  "pagos",
  {
    idPago: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCredito: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    montoPago: {
      type: sequelize.DECIMAL(10, 0),
      allowNull: false,
    },
    fechaPago: {
      type: sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Pagos",
    timestamps: false,
  }
);

module.exports = Pagos;
