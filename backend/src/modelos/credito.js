const  sequelize  = require("sequelize");
const db = require("../config/db");
const Credito = db.define(
  "credito",
  {
    idCredito: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCliente: {
      type: sequelize.INTEGER,
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
    SaldoFinal: {
      type: sequelize.DECIMAL(10, 0),
      allowNull: true,
    },
  },
  {
    tableName: "Credito",
    timestamps: false,
  }
);

module.exports = Credito;
