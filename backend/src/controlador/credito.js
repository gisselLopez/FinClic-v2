const Credito = require("../modelos/credito");
const ViewlistaCredito = require("../modelos/listarCreditos");
const Cliente = require("../modelos/cliente");
const  obtenerPagosParaCredito  = require("./pagos").obtenerPagosParaCredito;

const {
  generarTablaAmortizacion,
  calcularCuotaNivelada,
} = require("./calculosListaPagos");
const obtenerEstadisticasCreditosPorMes =
  require("../controlador/CreditosPorMes").obtenerEstadisticasCreditosPorMes;


exports.registrarCredito = async (req, res) => {
  try {
    const {
      nombreCliente,
      titulo,
      descripcion,
      Monto,
      Meses,
      Periodo,
      fechainicio,
      intereses,
    } = req.body;

    // Busca el cliente por su nombre en la tabla "Cliente"
    console.log("Intentando buscar el cliente...");
    const cliente = await Cliente.findOne({ where: { Nombre: nombreCliente } });
    console.log("Resultado de la búsqueda:", cliente);

    // Verifica si el cliente existe en la base de datos
    if (!cliente) {
      // Si el cliente no se encuentra, responde con un mensaje de error y estado 404 (no encontrado)
      return res
        .status(404)
        .json({ error: "El cliente no existe en la base de datos." });
    }
    //aqui van los calculos

    // Calcula cuotaNivelada aquí o obtén su valor de alguna fuente
    const cuotaNivelada = calcularCuotaNivelada(
      intereses,
      Periodo,
      Monto,
      Meses
    );
    // Ejemplo de cómo obtener su valor
    console.log("cuotaNivelada ", cuotaNivelada);

    const pagos = await obtenerPagosParaCredito(); // Ejemplo de cómo obtener su valor

    // Realizar los cálculos para la tabla de amortización aquí
    const tablaAmortizacion = generarTablaAmortizacion(
      Monto,
      cuotaNivelada,
      intereses,
      Meses,
      Periodo,
      pagos
    );
    console.log("tablaAmortizacion ", tablaAmortizacion);

    // Calcular saldoFinal utilizando los valores ya calculados en la tabla de amortización
    let saldoFinal = 0;
    for (const cuota of tablaAmortizacion) {
      // Obtén los valores de intereses y capital para el período actual
      const interesPago = parseFloat(cuota.interes);
      const capitalPago = parseFloat(cuota.capital);

      saldoFinal += interesPago + capitalPago;
      console.log("interesPago", interesPago);
      console.log("capitalPago", capitalPago);
    }

    // Crea el crédito asociado al cliente encontrado
    await Credito.create({
      idCliente: cliente.idCliente, // Asigna el idCliente del cliente encontrado para establecer la relación
      titulo,
      descripcion,
      Monto,
      Meses,
      Periodo,
      fechainicio,
      intereses,
      SaldoFinal: saldoFinal,
    });

    // Realizar cálculos para las estadísticas
    const creditosPorMes = await obtenerEstadisticasCreditosPorMes();

    return res.status(201).json({
      mensaje: "Crédito registrado exitosamente.",
      nombreCliente: cliente.Nombre,
      titulo,
      descripcion,
      Monto,
      Meses,
      Periodo,
      fechainicio,
      intereses,
      creditosPorMes,
    });
  } catch (error) {
    // En caso de error, imprime el error en la consola y responde con un mensaje de error y estado 500 (error del servidor)
    console.error(error);
    console.error("Error en la consulta o cálculos:", error);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al procesar la solicitud." });
  };

};



exports.ListarCreditosPorCliente = async (req, res) => {
  try {
    const { idCliente } = req.params;
    console.log("ID del cliente a buscar créditos:", idCliente);

    // Buscar créditos por el idCliente en la base de datos
    const listaCreditos = await Credito.findAll({ where: { idCliente } });
    console.log("Créditos encontrados:", listaCreditos);

    // Verificar si no existen créditos para este cliente
    if (listaCreditos.length === 0) {
      console.log("No existen créditos para este cliente");
      return res.send("No existen créditos para este cliente");
    }
    // Si existen créditos, enviarlos en la respuesta en formato JSON
    return res.json(listaCreditos);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener la lista de créditos" });
  }
};


exports.ListarCreditos = async (req, res) => {
  try {
    // Buscar todos los créditos en la base de datos
    const listaCreditos = await ViewlistaCredito.findAll();

    if (listaCreditos.length === 0) {
      console.log("No existen créditos registrados");
      return res.send("No existen créditos registrados");
    }

    return res.json(listaCreditos);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener la lista de créditos" });
  }
};





















/*



// Listar créditos por cliente
exports.ListarCreditosPorCliente = async (req, res) => {
  try {
    const { idCliente } = req.params;
    console.log("ID del cliente a buscar créditos:", idCliente);

    // Buscar créditos por el idCliente en la base de datos
    const listaCreditos = await Credito.findAll({ where: { idCliente } });
    console.log("Créditos encontrados:", listaCreditos);

    // Verificar si no existen créditos para este cliente
    if (listaCreditos.length === 0) {
      console.log("No existen créditos para este cliente");
      return res.send("No existen créditos para este cliente");
    }
    // Si existen créditos, enviarlos en la respuesta en formato JSON
    return res.json(listaCreditos);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener la lista de créditos" });
  }
};

*/
