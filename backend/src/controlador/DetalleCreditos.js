const VistaDetalleCredito = require("../modelos/detalleCreditos");
const Credito = require("../modelos/credito"); // Importa el modelo de la tabla Credito
const { obtenerAbonosParaCredito } = require("./abonos");
const { obtenerPagosParaCredito } = require("./pagos");
const {
  calcularCuotaNivelada,
  generarTablaAmortizacion,
} = require("./calculosListaPagos");

exports.DetalleCreditos = async(req, res) =>{
  
    try {
    const detalleCreditos = await VistaDetalleCredito.findAll();
    //console.log(detalleCreditos);
    res.json(detalleCreditos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos." });
  }
} 


exports.generarListaPagosbyid = async (req,res) =>{
  //req.query es una propiedad utilizada en el contexto de programación web para acceder
  //a los parámetros de consulta (query parameters) en una solicitud HTTP
  //ejm:http://ejemplo.com/ruta?nombre=Juan&edad=25

  const { idCredito } = req.query;
  try {
    console.log("Obteniendo información del crédito...");
    // Obtén la información del crédito desde la base de datos utilizando el ID
    const credito = await Credito.findOne({ where: { idCredito: idCredito } });

    if (!credito) {
      return res.status(404).json({ error: "Crédito no encontrado" });
    }
    // Utiliza la función DetalleCreditos para obtener información adicional
    // Obtén los detalles de crédito desde la base de datos utilizando el ID de crédito
    console.log("Obteniendo detalles de crédito...");
    const detalleCreditos = await VistaDetalleCredito.findAll({
      where: { idCredito: idCredito },
    });
    const intereses = credito.intereses;
    const Periodo = credito.Periodo;
    const Monto = parseFloat(credito.Monto);
    const Meses = parseInt(credito.Meses);
    const fechaInicio = credito.fechainicio;

    const cuotaNivelada = calcularCuotaNivelada(
      intereses,
      Periodo,
      Monto,
      Meses
    );

    const abonos = await obtenerAbonosParaCredito(idCredito);
    const pagos = await obtenerPagosParaCredito(idCredito);

    const tablaAmortizacion = generarTablaAmortizacion(
      Monto,
      cuotaNivelada,
      intereses,
      Meses,
      Periodo,
      abonos,
      pagos,
      fechaInicio
    );

    // Construye el objeto de respuesta JSON con toda la información de detalleCreditos
    const respuestaJSON = {
      detalleCreditos, // Aquí agregamos el objeto completo de detalleCreditos
      tablaAmortizacion,
    };
    // Por ejemplo, en generarListaPagosbyid
    console.log("Obteniendo información del crédito...");
    console.log("Detalle de créditos:", detalleCreditos);

    console.log("Enviando respuesta JSON...");
    res.json(respuestaJSON);
  } catch (error) {
    console.error("Error en algún paso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

/*
const aplicarAbonos = (tablaAmortizacion, abonos) => {
  abonos.forEach((abono) => {
    let montoAbono = parseFloat(abono.montoAbono);
    const fechaAbono = new Date(abono.fechaAbono);

    tablaAmortizacion.forEach((pago, index) => {
      const fechaPago = new Date(pago.fechaPago);

      if (fechaAbono.getTime() >= fechaPago.getTime()) {
        if (montoAbono > 0) {
          const saldoPendiente = parseFloat(pago.saldoPendiente);

          if (montoAbono >= saldoPendiente) {
            const abonoRestante = montoAbono - saldoPendiente;

            tablaAmortizacion[index].montoAbono = saldoPendiente.toFixed(2);
            tablaAmortizacion[index].saldoPendiente = "0.00";
            montoAbono = abonoRestante;
          } else {
            tablaAmortizacion[index].montoAbono = montoAbono.toFixed(2);
            tablaAmortizacion[index].saldoPendiente = (
              saldoPendiente - montoAbono
            ).toFixed(2);
            montoAbono = 0;
          }
        }
      }

      const interes = parseFloat(pago.interes);
      const capital = parseFloat(pago.capital);

      if (index < tablaAmortizacion.length - 1) {
        tablaAmortizacion[index + 1].interes = interes.toFixed(2);
        tablaAmortizacion[index + 1].capital = capital.toFixed(2);
      }
    });
  });
};

*/