const sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = db.define(
  "usuario",{

    idRegistro: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    email: {
      type: sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    DNI: {
      type: sequelize.BIGINT(15),
      allowNull: false,
    },
    telefono: {
      type: sequelize.INTEGER(8),
      allowNull: false,
    },
    empresa: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    password: {
      type: sequelize.STRING(100),
      allowNull: false,
    }
  },
  {
    tableName: "Registro", // tal y como esta en la bd
    timestamps: false,
  }
);
module.exports = Usuario;
