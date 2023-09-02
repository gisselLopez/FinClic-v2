const Pago = require("../modelos/pagos");
const Credito = require("../modelos/credito");

// Registrar pago
exports.RegistrarPago = async (req, res) => {
  try {
    const { idCredito, fechaPago, montoPago } = req.body;

    // Verificar si  el crédito existen

    console.log("Intentando buscar el credito...");
    console.log("id del credito...",idCredito);

    const creditoExistente = await Credito.findOne({
      where: { idCredito: idCredito },
    });
    // Verifica si el cliente y el credito existe en la base de datos
    if (!creditoExistente) {
      return res.status(404).json({ error: "Crédito no encontrado" });
    }
    // Aquí continuaría el registro del pago en la base de datos
    // Crear un nuevo registro de pago en la base de datos
    await Pago.create({
      idCredito: idCredito,
      fechaPago: fechaPago,
      montoPago: montoPago,
    });
    


    return res.status(201).json({
      message: "Pago registrado ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al registrar el pago" });
  }
};
//funcion para obtener todos los pagos de la bd referente al idCredito
exports.obtenerPagosParaCredito = async (idCredito) => {
  try {
    //const { idCredito } = req.query;
    const pagos = await Pago.findAll({ where: { idCredito } });
    return pagos;
  } catch (error) {
    console.error("Hubo un error al obtener los pagos", error);
    return [];
  }
};