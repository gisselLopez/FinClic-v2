const express = require("express");
const router = express.Router();
const Cliente = require("../controlador/cliente");

//ruta para crear un cliente
router.post("/crear", Cliente.Crear);
//ruta para listar clientes
router.get("/listar", Cliente.ListarClientes);

module.exports = router;
