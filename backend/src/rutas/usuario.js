const express = require("express");
const router = express.Router();
const AuthController = require("../controlador/usuario");

router.post("/api/registro", AuthController.registro);
router.post("/api/iniciar-sesion", AuthController.iniciarSesion);

module.exports = router;
