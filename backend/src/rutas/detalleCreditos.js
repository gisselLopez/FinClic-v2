const express = require("express");
const router = express.Router();
const DetalleCredito = require("../controlador/DetalleCreditos");

// detalleCreditos.js
router.get("/", DetalleCredito.DetalleCreditos);
//ruta para crear un Credito
router.get("/detalle-credito", DetalleCredito.generarListaPagosbyid);

module.exports = router; // Exporta el enrutador