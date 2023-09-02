import React, { useState, useEffect } from "react";
//import "../../css/cliente/ListarCliente.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Link } from "react-router-dom";

import ProtectedWrapper from "../Auth/Providers/ProtectedWrapper";

import { useQuery } from "react-query";

const ListaClientes = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la consulta de búsqueda

  // Utiliza React Query para gestionar la carga de datos
  const { data: clientes, error } = useQuery(
    "clientes",
    async () => {
      const response = await fetch(
        "http://localhost:3001/auth/listarcliente/listar",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      console.log(error);
      return response.json("error al obtener datos", error);
    },

    {
      //El segundo argumento es un objeto de opciones que puede contener dos propiedades:
      //onSuccess: Una función que se ejecuta después de una mutación exitosa.
      onSuccess: () => {
        console.log("lista exitoso");
        // Realizar acciones adicionales después del registro exitoso
      },
      //onError: Una función que se ejecuta en caso de que ocurra un error durante la mutación.
      onError: (error) => {
        alert("Error al obtener el historial de clientes: " + error.message);
        console.error("Error al obtener el historial de clientes:", error);
        // Realizar acciones adicionales en caso de error de registro
      },
    }
  );
  // Filtrar la lista de clientes según la consulta de búsqueda
  // Filtrar la lista de clientes solo si hay datos disponibles
  const filteredClientes = clientes
    ? clientes.filter(
        (cliente) =>
          cliente.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cliente.DNI.toString().includes(searchQuery)
      )
    : [];
  return (
    < >
      <div className="my-container justify-content-center align-items-center">
        <div className="my-container-1 mt-4">
          <br />
          <h1
            className="my-text-center mb-3"
            style={{
              maxWidth: "600px",
              marginLeft: "600px",
              fontFamily: "cursive",
            }}
          >
            Historial de clientes
          </h1>
          {/* Muestra la lista de clientes si mostrarFormulario es falso */}
          <div className="table-responsive ">
            {/* Agregar un campo de búsqueda */}
            <div className="d-flex align-items-center mb-3">
              <span
                className="mr-2"
                style={{
                  maxWidth: "650px",
                  marginLeft: "430px",
                  fontSize: "20px",
                }}
              >
                <i class="bi bi-search"></i>
              </span>
              <input
                style={{
                  maxWidth: "550px",
                  marginLeft: "5px",
                  textAlign: "center",
                }}
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o DNI"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link to="/dashboard/crear" className="text-info ml-2">
                <i
                  className="bi bi-file-plus"
                  style={{
                    fontSize: "2.3rem",
                    maxWidth: "650px",
                  }}
                ></i>
              </Link>
            </div>
            {clientes && (
              <table
                className="table table-hover table-bordered"
                style={{
                  maxWidth: "830px",
                  marginLeft: "350px",
                  fontSize: "13px",
                }}
              >
                <thead class="table-dark">
                  <tr>
                    <th>Nombre completo</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>DNI</th>
                    <th>Dirección</th>
                    <th>Dirección</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.Nombre}</td>
                      <td>{cliente.Telefono}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.DNI}</td>
                      <td>{cliente.Direccion}</td>
                      <td>{cliente.Direccion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaClientes;
