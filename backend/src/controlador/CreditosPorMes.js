const CreditoPorMes = require("../modelos/CreditosXmes");
// Función para obtener las estadísticas de créditos creados por mes
exports.obtenerEstadisticasCreditosPorMes = async (req, res) => {
  /*Dentro del bloque try, se utiliza el método findAll() en el modelo
   CreditoPorMes para obtener todas las estadísticas de créditos creados
    por mes. */
  try {
    const creditosPorMes = await CreditoPorMes.findAll();
    //console.log("Datos obtenidos:", creditosPorMes);
    // Envía los datos obtenidos como respuesta al cliente en formato JSON
    res.json(creditosPorMes); // Enviar la respuesta como JSON
    return creditosPorMes;
  } catch (error) {
    console.error("Error en la consulta:", error);
  }
};

