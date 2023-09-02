const bcrypt = require("bcrypt");
const Registro = require("../modelos/usuario");

class AuthController {
  async registro(req, res) {
    try {
      const { nombre, email, DNI, telefono, empresa, password } =
        req.body;

      // Verificar si el usuario ya existe en la base de datos
      const registroExistente = await Registro.findOne({ where: { email } });
      if (registroExistente) {
        return res.status(400).json({ error: "El usuario ya está registrado" });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo registro en la base de datos
      const nuevoRegistro = await Registro.create({
        nombre,
        email,
        DNI,
        telefono,
        empresa,
        password: hashedPassword,
      });

      return res.status(201).json(nuevoRegistro);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el registro" });
    }
  }

  async iniciarSesion(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar el registro en la base de datos
      const registro = await Registro.findOne({ where: { email } });
      if (!registro) {
        return res.status(400).json({ error: "Credenciales inválidas" });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, registro.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Credenciales inválidas" });
      }

      // Inicio de sesión exitoso
      return res.status(200).json({ message: "Inicio de sesión exitoso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el inicio de sesión" });
    }
  }
}

module.exports = new AuthController();
