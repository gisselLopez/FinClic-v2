const sequelize = require("sequelize");
const db = require("../config/db");
const CreditoPorMes = db.define(
  "CreditosPorMes",
  {
    mes: {
      type: sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    totalMonto: {
      type: sequelize.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "CreditosPorMes", // Especifica el nombre de la vista
    timestamps: false, // No se utilizan marcas de tiempo en las vistas
  }
);

module.exports = CreditoPorMes;
