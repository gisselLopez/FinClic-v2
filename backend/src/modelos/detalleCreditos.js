const sequelize = require("sequelize");
const db = require("../config/db");
const detalleCreditos = db.define(
  "ViewDetalleDeCredito",
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
    Telefono: {
      type: sequelize.INTEGER(8),
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
    fechainicio: {
      type: sequelize.DATE,
      allowNull: false,
    },
    fechaAbono: {
      type: sequelize.DATE,
      allowNull: false,
    },
    montoAbono: {
      type: sequelize.DECIMAL(10, 0),
      allowNull: false,
    },
  },
  {
    tableName: "ViewDetalleDeCredito",
    timestamps: false,
  }
);

module.exports = detalleCreditos;