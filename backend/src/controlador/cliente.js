const Cliente = require("../modelos/cliente");

//crear cliente
exports.Crear= async (req, res) => {
    try {
      const { Nombre, Telefono, email, DNI,Direccion } = req.body;

      // Verificar si el cliente ya existe en la base de datos
      const ClienteExistente = await Cliente.findOne({ where: { email } });
      if (ClienteExistente) {
        return res.status(400).json({ error: "El cliente ya está registrado" });
      }
      // Crear el nuevo Cliente en la base de datos
      const nuevoCliente = await Cliente.create({
        Nombre,
        Telefono,
        email,
        DNI,
        Direccion,
      });

      return res.status(201).json(nuevoCliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el registro" });
    }
  }

//Listar clientes
exports.ListarClientes = async (req, res) => {
  const listacliente = await Cliente.findAll();
  if (listacliente.length == 0) {
    res.send("No existen datos");
  } else {
    res.json(listacliente);
  }
};