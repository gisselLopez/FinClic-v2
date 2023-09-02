const { Sequelize } = require("sequelize");

// Configuración de la base de datos
const sequelize = new Sequelize("Finclic", "root", "", {
  host: "192.168.64.3",
  dialect: "mysql",
});

// Conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida correctamente con la base de datos.");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

module.exports = sequelize;
