const express = require("express");
const router = express.Router();
const Pagos = require("../controlador/pagos");

//ruta para crear un pago
router.post("/crear/pago", Pagos.RegistrarPago);
//listar u obtener
router.get("/obtener", Pagos.obtenerPagosParaCredito);

module.exports = router;

