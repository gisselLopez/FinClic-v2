const sequelize = require("sequelize");
const db = require("../config/db");
const ViewlistaCredito = db.define(
  "listaCredito",
  {
    idCredito: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Nombre: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    titulo: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    descripcion: {
      type: sequelize.STRING(200),
      allowNull: false,
    },
    Monto: {
      type: sequelize.DECIMAL(10, 0),
      allowNull: false,
    },
    Meses: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    Periodo: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    fechainicio: {
      type: sequelize.DATE,
      allowNull: false,
    },
    intereses: {
      type: sequelize.DECIMAL(10, 0),
      allowNull: false,
    },
  },
  {
    tableName: "listaCredito",
    timestamps: false,
  }
);

module.exports = ViewlistaCredito;
