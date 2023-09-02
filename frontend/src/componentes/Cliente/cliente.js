import React, { useState } from "react";
import { useMutation } from "react-query";
import { Form, Button } from "react-bootstrap";
import "../../css/cliente/cliente.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedWrapper from "../Auth/Providers/ProtectedWrapper";

const RegistroCliente = () => {
  // Estados locales para los campos del formulario
  const [Nombre, setNombre] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [DNI, setDNI] = useState("");
  const [Direccion, setDireccion] = useState("");

  //hook useMutation para realizar la mutacionn(enviar los datos al servidor)
  /*
  useMutation es un hook de la biblioteca react-query que facilita el manejo de operaciones
  de mutación en aplicaciones de React. Se utiliza para enviar datos al servidor mediante
  solicitudes HTTP de tipo POST, PUT, PATCH o DELETE, lo que permite modificar o actualizar
  datos en el servidor.

  */
  const registroClienteMutation = useMutation(
    /*El primer argumento de useMutation es una función asincrónica que contiene
    el código para realizar la mutación. En esta función, se realizan
    las solicitudes HTTP al servidor, se envían los datos y se procesa la respuesta. */
    async (datosRegistro) => {
      const response = await fetch("http://localhost:3001/auth/cliente/crear", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRegistro),
      });

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      return response.json();
    },
    {
      //El segundo argumento es un objeto de opciones que puede contener dos propiedades:
      //onSuccess: Una función que se ejecuta después de una mutación exitosa.
      onSuccess: () => {
        alert("Registro exitoso");
        console.log("Registro exitoso");
        // Realizar acciones adicionales después del registro exitoso
      },
      //onError: Una función que se ejecuta en caso de que ocurra un error durante la mutación.
      onError: (error) => {
        alert("Error en el registro: " + error.message);
        console.error("Error en el registro:", error);
        // Realizar acciones adicionales en caso de error de registro
      },
    }
  );
  // Función que se ejecuta al enviar el formulario
  const handleRegistro = (e) => {
    e.preventDefault();
    // Validar que todos los campos estén completados
    if (!Nombre || !Telefono || !email || !DNI || !Direccion) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const datosRegistro = {
      Nombre,
      Telefono,
      email,
      DNI,
      Direccion,
    };
    // Ejecutar la mutación para realizar el registro
    registroClienteMutation.mutate(datosRegistro);

    // Restablecer los valores de los campos del formulario
    setNombre("");
    setTelefono("");
    setEmail("");
    setDNI("");
    setDireccion("");
  };
  //renderizado del formulario
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center ">
        <div className="my-custom-form p-4   " style={{ marginLeft: "550px" }}>
          <h3 className="text-center mb-4">
            <i className="bi bi-person-fill-add"></i>Cliente
          </h3>
          <div>
            <Form onSubmit={handleRegistro}>
              <Form.Group controlId="formNombre" className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={Nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formTelefono" className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={Telefono}
                  onChange={(e) => setTelefono(e.target.value)}
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
              <Form.Group controlId="formDireccion" className="mb-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={Direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" className="btn btn-info">
                  Crear
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegistroCliente;