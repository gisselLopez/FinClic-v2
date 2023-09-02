const Abonos = require("../modelos/abonos");

// Ruta para crear un nuevo abono
exports.crearAbono= async (req, res) => {
  try {
    const { idCliente, idCredito, montoAbono, fechaAbono } = req.body;

    const nuevoAbono = await Abonos.create({
      idCliente,
      idCredito,
      montoAbono,
      fechaAbono,
    });

    return res.status(201).json(nuevoAbono);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Hubo un error al crear el abono" });
  }
};


// Función para obtener los abonos para un crédito específico
exports.obtenerAbonosParaCredito = async (idCredito) => {
  try {
    const abonos = await Abonos.findAll({ where: { idCredito } });
    return abonos;
  } catch (error) {
    console.error("Hubo un error al obtener los abonos", error);
    return [];
  }
};


