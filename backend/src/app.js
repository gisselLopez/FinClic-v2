const express = require("express");
const cors = require("cors");
const app = express();
// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto por el origen permitido del frontend
  methods: ['GET', 'POST'], // Cambia esto según los métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cambia esto según los encabezados permitidos
}));

const authRoutes = require("./rutas/usuario");
//cliente
const clienteRoutes = require("./rutas/cliente");
//credito
const creditoRoutes = require("./rutas/credito");
//credito
const tablaAmortizacion = require("./rutas/credito");

//detalle-credito
const detalleCreditosRouter = require("./rutas/detalleCreditos");

//abonso
const abonosRoutes = require("./rutas/Abonos")
//pago
const pagoRoutes =require("./rutas/pagos");
const { link } = require("fs");

// Configuración y middleware

app.use(express.json());
app.use("/auth", authRoutes);

//cliente
app.use("/auth/cliente", clienteRoutes);
app.use("/auth/listarcliente", clienteRoutes);
//credito
app.use("/auth/credito", creditoRoutes);
app.use("/auth/listarcredito", creditoRoutes);
app.use("/auth/estadisticas", creditoRoutes);
//tabla de amortizacion
app.use("/auth/tabla", tablaAmortizacion);
//detalle credito
app.use("/auth/detalle", detalleCreditosRouter);
//abonos
app.use("/auth/abono",abonosRoutes);


//pagos
app.use("/auth/pago",pagoRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
