const express = require("express");
const router = express.Router();
const Abonos = require("../controlador/abonos");

//ruta para crear un cliente
router.post("/crear-abono", Abonos.crearAbono);
router.get("/obtener-abono/:idCredito", Abonos.obtenerAbonosParaCredito);

module.exports = router;
