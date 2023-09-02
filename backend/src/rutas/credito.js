const express = require("express");
const router = express.Router();
const Credito = require("../controlador/credito");
//const resultados = require("../controlador/CalcularCredito");
const CreditoPorMes = require("../controlador/CreditosPorMes");
const tablaAmortizacion = require("../controlador/listaPagos");

//router.get("/obtener-resultados-calculo", resultados.obtenerResultadosCalculo);

//ruta para crear un Credito
router.post("/registrar-credito", Credito.registrarCredito);

//ruta para listar Creditos por cliente
router.get("/listar-credito/:idCliente", Credito.ListarCreditosPorCliente);

//ruta para listar Creditos en general
router.get("/listar-credito", Credito.ListarCreditos);

//ruta para estadisticas por mes
router.get("/por-mes", CreditoPorMes.obtenerEstadisticasCreditosPorMes);

//ruta para crear una tabla de amortizacion
router.get(
  "/generar-tabla-amortizacion",
  tablaAmortizacion.gerenerarListaPagos
);
module.exports = router;




















/*
const {
  calcularInteres,
  obtenerNumeroCuotas,
  calcularPago,
} = require("../controlador/CalcularCredito");
*/
// Ruta para obtener los resultados del cálculo de crédito
/*router.get("/obtener-resultados-calculo", (req, res) => {
  const { Monto, Meses, Periodo, intereses } = req.query;
  /*
  // Convertimos Monto y Meses a números para asegurarnos de que sean valores válidos
  const montoNumerico = parseFloat(Monto);
  const mesesNumerico = parseInt(Meses);

  // Verificamos si Monto y Meses son números válidos
  if (isNaN(montoNumerico) || isNaN(mesesNumerico)) {
    return res
      .status(400)
      .json({ error: "Monto y Meses deben ser números válidos." });
  }

  // Calculamos el interés en base a la tasa ingresada por el cliente
  const interes = calcularInteres(intereses);

  // Calculamos el número total de cuotas según el tipo de período seleccionado
  const numeroCuotas = obtenerNumeroCuotas(mesesNumerico, Periodo);

  // Calculamos el monto total de interés en los meses
  const interesTotal = montoNumerico * interes * mesesNumerico;

  // Calculamos el total a pagar en los meses (Monto inicial + interesTotal)
  const totalPagar = montoNumerico + interesTotal;

  // Calculamos la ganancia (intereses) en los meses
  const ganancia = interesTotal;

  console.log(
    `Le tocará pagar ${numeroCuotas} cuotas, ${Periodo} en total serían: ${totalPagar.toFixed(
      2
    )} y su ganancia sería de: ${ganancia.toFixed(2)}`
  );

  const cuota = totalPagar / numeroCuotas;
  for (let i = 1; i <= numeroCuotas; i++) {
    console.log(`Cuota ${i}: ${cuota.toFixed(2)}`);
  }

  // Responder con los resultados del cálculo
  return res.status(200).json({
    interesCalculado: interes.toFixed(2),
    numeroCuotas,
    totalPagar: totalPagar.toFixed(2),
    ganancia: ganancia.toFixed(2),
    montoCuota: cuota.toFixed(2),
  });/
  // Realizamos el cálculo y obtenemos los resultados
  const resultados = obtenerResultadosCalculo(Monto, Meses, Periodo, intereses);

  // Responder con los resultados del cálculo
  return res.status(200).json(resultados);
});*/


