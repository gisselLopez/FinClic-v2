
const moment = require("moment"); // Asegúrate de tener moment instalado
const Credito = require("../modelos/credito"); // Importa el modelo de la tabla Credito
const {calcularCuotaNivelada,generarTablaAmortizacion} =
require("./calculosListaPagos")
exports.gerenerarListaPagos = async (req, res) => {
  try {
    //req.query es una propiedad utilizada en el contexto de programación web para acceder
    //a los parámetros de consulta (query parameters) en una solicitud HTTP
    //ejm:http://ejemplo.com/ruta?nombre=Juan&edad=25

    const { Monto, intereses, Meses, Periodo } = req.query;
    const cuotaNivelada = calcularCuotaNivelada(
      intereses,
      Periodo,
      Monto,
      Meses
    );
     const tablaAmortizacion = generarTablaAmortizacion(
       Monto,
       cuotaNivelada,
       intereses,
       Meses,
       Periodo
     );

    res.json(tablaAmortizacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};






/*
exports.gerenerarListaPagos = async (req,res) =>{
    const { idCredito } = req.query;
     try {
    // Obtén la información del crédito desde la base de datos utilizando el ID
    const credito = await Credito.findOne({ where: { idCredito } });

    if (!credito) {
      return res.status(404).json({ error: "Crédito no encontrado" });
    }

    const intereses = credito.intereses;
    const Periodo = credito.Periodo;
    const Monto = parseFloat(credito.Monto);
    const Meses = parseInt(credito.Meses);
    const fechaInicio = credito.fechainicio;

    const cuotaNivelada = calcularCuotaNivelada(
      intereses,
      Periodo,
      Monto,
      Meses,
    );
    const tablaAmortizacion = generarTablaAmortizacion(
      Monto,
      cuotaNivelada,
      intereses,
      Meses,
      Periodo,
      fechaInicio
    );

    res.json(tablaAmortizacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

*/


/*
router.post("/generar-tabla-amortizacion", async (req, res) => {
  const { idCredito } = req.body;

  try {
    // Obtén la información del crédito desde la base de datos utilizando el ID
    const credito = await Credito.findOne({ where: { idCredito } });

    if (!credito) {
      return res.status(404).json({ error: "Crédito no encontrado" });
    }

    const intereses = credito.intereses;
    const Periodo = parseInt(credito.Periodo);
    const Monto = parseFloat(credito.Monto);
    const Meses = parseInt(credito.Meses);

    const cuotaNivelada = calcularCuotaNivelada(
      intereses,
      Periodo,
      Monto,
      Meses
    );
    const tablaAmortizacion = generarTablaAmortizacion(
      Monto,
      cuotaNivelada,
      intereses,
      Meses,
      Periodo
    );

    res.json(tablaAmortizacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
*/