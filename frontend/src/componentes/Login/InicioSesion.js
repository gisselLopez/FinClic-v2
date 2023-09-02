import React, { useState,useEffect } from "react";
import { useMutation } from "react-query";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";// Importa useNavigate para manejar la redirección
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/inicio/InicioSesion.css"

const iniciarSesion = async (data) => {
  const response = await fetch(
    "http://localhost:3001/auth/api/iniciar-sesion",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

const InicioSesion = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(iniciarSesion, {
    onSuccess: async (user) => {
      try {
        console.log("Inicio de sesión exitoso");
        alert("Inicio de sesión exitoso");
        await onLoginSuccess(user); // Llama al callback proporcionado
        console.log("Antes de redirigir a /dashboard");
        navigate("/dashboard"); // Redirige a la subruta del Sidebar
        console.log("Después de redirigir a /dashboard");
      } catch (error) {
        alert("Error en el inicio de sesión, verifique sus credenciales");
        console.error("Error en el inicio de sesión:", error);
      }
    },
  });

  const handleInicioSesion = async (e) => {
    e.preventDefault();
    // Validar que todos los campos estén completados
    if (!email || !password) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    const data = {
      email,
      password,
    };
    try {
      console.log("Antes de llamar a mutation.mutate");
      await mutation.mutateAsync(data);
    } catch (error) {
      alert("Error en el inicio de sesión, verifique sus credenciales");
      console.error("Error en el inicio de sesión:", error);
    }
    // Restablecer los valores de los campos del formulario
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 ">
      <div className="form_container p-5 rounded  ">
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <Form onSubmit={handleInicioSesion}>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid" style={{ marginTop: "15px" }}>
            <Button type="submit" className="btn btn-info">
              Aceptar
            </Button>
          </div>
        </Form>
        <div className="text-center mt-3">
          <p>¿No tienes cuenta?</p>
          <a href="/registro" className="link" style={{ color: "black" }}>
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
