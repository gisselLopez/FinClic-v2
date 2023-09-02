import React from "react";
import { useQuery } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

const Clientes = async () => {
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
    throw new Error("Error al obtener la lista de clientes.");
  }
  const data = await response.json();
  console.log(data);
  return data;
};

const CreditosPorCliente = async (idCliente) => {
  const response = await fetch(
    `http://localhost:3001/auth/listarcredito/listar-credito/${idCliente}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error al obtener los credito por clientes.");
  }
  const data = await response.json();

  return data;
};

const CreditosPorClientePage = () => {
  const { data: clientes } = useQuery("clientes", Clientes);
  const [selectedClienteId, setSelectedClienteId] = React.useState(null);
  const { data: listaCreditos } = useQuery(
    ["creditos", selectedClienteId],
    () => CreditosPorCliente(selectedClienteId),
    { enabled: !!selectedClienteId }
  );
  const mensajeNoCreditos = null;

  if (listaCreditos && listaCreditos.length === 0) {
    mensajeNoCreditos = <p>No hay créditos para este cliente.</p>;
    alert("no hay creditos");
  }

  return (
    <div>
      <div></div>
      <h1
        style={{
          maxWidth: "900px",
          marginLeft: "600px",
          marginTop: "50px",
          fontFamily: "cursive",
        }}
      >
        Créditos por Cliente
      </h1>
      <div>
        <div>
          <div
            style={{
              maxWidth: "900px",
              marginLeft: "70px",
              marginTop: "50px",
            }}
          >
            <label
              htmlFor="cliente"
              style={{
                marginLeft: "230px",
                fontSize: "23px",
              }}
            >
              Seleccionar Cliente:
            </label>
            <select
              id="cliente"
              onChange={(event) => setSelectedClienteId(event.target.value)}
            >
              <option
                value=""
                style={{
                  maxWidth: "50px",
                  color: "green",
                  fontFamily: "cursive",
                }}
              >
                Seleccione un cliente
              </option>
              {clientes?.map((cliente) => (
                <option key={cliente.idCliente} value={cliente.idCliente}>
                  {cliente.Nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            {mensajeNoCreditos}
            {listaCreditos && (
              <div>
                <table
                  className="table table-hover table-bordered"
                  style={{
                    maxWidth: "950px",
                    marginLeft: "300px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  <thead class="table-dark">
                    <tr>
                      <th>Titulo</th>
                      <th>Descripcion</th>
                      <th>Monto</th>
                      <th>Interes</th>
                      <th>Meses</th>
                      <th>Periodo</th>
                      <th>Fecha de inicio</th>
                      {/* Agrega más encabezados de columna si es necesario */}
                    </tr>
                  </thead>
                  <tbody>
                    {listaCreditos.map((credito) => (
                      <tr key={credito.idCredito}>
                        <td>{credito.titulo}</td>
                        <td>{credito.descripcion}</td>
                        <td>{credito.Monto}</td>
                        <td>{credito.intereses}</td>
                        <td>{credito.Meses}</td>
                        <td>{credito.Periodo}</td>
                        <td>{credito.fechainicio}</td>

                        {/* Agrega más celdas si es necesario */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditosPorClientePage;
