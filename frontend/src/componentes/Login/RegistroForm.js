import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../css/Registro/RegistroForm.css"
import { useNavigate } from "react-router-dom"; // Importa useNavigate para manejar la redirección

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [DNI, setDNI] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Obtiene la función navigate para manejar la redirección

  const handleRegistro = async (e) => {
    e.preventDefault();
    // Validar que todos los campos estén completados
    if (!nombre || !email || !DNI || !telefono || !empresa || !password) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Si llegamos aquí, todos los datos son válidos, podemos proceder con el registro
    const datosRegistro = {
      nombre,
      email,
      DNI,
      telefono,
      empresa,
      password,
    };

    try {
      const response = await fetch("http://localhost:3001/auth/api/registro", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRegistro),
      });

      if (response.ok) {
        alert("Registro exitoso");
        console.log("Registro exitoso");
        // Realizar acciones adicionales después del registro exitoso
        navigate("/inicio-sesion"); // Redirige al usuario a la ruta "/inicio-sesion"
      } else {
        try {
          const error = await response.json();
          alert("Error en el registro:", error);
          console.log("Error en el registro:", error);
          // Mostrar mensaje de error específico al usuario
          // Ejemplo: setError("Error en el registro: " + error.message);
        } catch (error) {
          alert("Error en el registro:", error);
          console.error("Error en el registro:", error);
          // Mostrar un mensaje de error genérico al usuario
          // Ejemplo: setError("Error en el registro. Por favor, inténtalo de nuevo más tarde.");
        }
        // Realizar acciones adicionales en caso de error de registro
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      // Mostrar un mensaje de error genérico al usuario
      // Ejemplo: setError("Error en la solicitud de registro. Por favor, inténtalo de nuevo más tarde.");
      // Realizar acciones adicionales en caso de error de solicitud
    }

    // Restablecer los valores de los campos del formulario
    setNombre("");
    setEmail("");
    setDNI("");
    setTelefono("");
    setEmpresa("");
    setPassword("");
  };

  return (
    <div className="container d-flex align-items-center justify-content-center ">
      <div className="form p-5  bg-white ">
        <h3 className="text-center mb-4">
          <i className="bi bi-person-fill-add"></i>Registro
        </h3>
        <Form onSubmit={handleRegistro}>
          <Form.Group controlId="formNombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDNI" className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={DNI}
              onChange={(e) => setDNI(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTelefono" className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmpresa" className="mb-3">
            <Form.Label>Empresa</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid ">
            <Button type="button" className="btn btn-info">
              Registrarse
            </Button>
          </div>
        </Form>
        <p className="text-center mt-3">
          ¿Ya tienes una cuenta? <br />
          <a href="/inicio-sesion" className="link" style={{ color: "black" }}>
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registro;
