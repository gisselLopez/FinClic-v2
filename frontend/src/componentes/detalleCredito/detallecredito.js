import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useQuery } from "react-query";
import "../../css/credito/detallecredito.css"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Pagos from "../pagos/pagos"
function CreditList() {
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [creditDetails, setCreditDetails] = useState(null);
  const [tablaAmortizacion, setTablaAmortizacion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef(null); // Definir tableRef aquí
  const creditsPerPage = 5;

  const [montoCuotaSeleccionada, setMontoCuotaSeleccionada] = useState("");
  const [fechaCuotaSeleccionada, setFechaPago] = useState("");

  // Utiliza React Query para gestionar la carga de datos
  const { data: creditos } = useQuery("creditos", async () => {
    try {
      // Obtener la lista de créditos
      const creditosResponse = await fetch(
        "http://localhost:3001/auth/credito/listar-credito",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!creditosResponse.ok) {
        throw new Error("Error al obtener la lista de credito.");
      }
      const creditosData = await creditosResponse.json();

      return creditosData;
    } catch (error) {
      console.error("Error obteniendo la lista de créditos", error);
    }
  });

  /*handleCreditClick(idCredito): Maneja el clic en un crédito. Realiza una solicitud
   al servidor para obtener los detalles del crédito seleccionado por su ID y actualiza 
   el estado creditDetails. */

  const handleCreditClick = async (idCredito) => {
    console.log("idCredito: ", idCredito);
    try {
      console.log("handleCreditClick idCredito:", idCredito); // Agrega esta línea para verificar el valor

      const response = await fetch(
        `http://localhost:3001/auth/detalle/detalle-credito?idCredito=${idCredito}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener el detalle de creditos.");
      }
      setSelectedCredit(idCredito);
      const creditDetailsData = await response.json(); // Parsea la respuesta JSON
      // Asegúrate de que creditDetailsData contiene los detalles del crédito y la tabla de amortización
      console.log("creditDetailsData:", creditDetailsData); // Agrega este console.log para verificar la respuesta
      setCreditDetails(creditDetailsData);
      setTablaAmortizacion(creditDetailsData.tablaAmortizacion); // Asegúrate de que coincide con la propiedad en tu estructura de datos
    } catch (error) {
      console.error("Error obteniendo detalles de crédito", error);
    }
  };
  const handleDescargarPDF = async () => {
    // Crea un blob con el contenido del PDF
    try {
      console.log("Iniciando descarga del PDF");
      const tableNode = tableRef.current;
      const tableRect = tableNode.getBoundingClientRect();

      // Generar una imagen desde la tabla usando html2canvas
      const canvas = await html2canvas(tableNode, {
        width: tableRect.width * 1, // Ajusta este valor si es necesario
        height: tableRect.height * 1, // Ajusta este valor si es necesario
        scale: 2,
        useCORS: true,
        dpi: 700,
      });

      const imgData = canvas.toDataURL("image/png");

      // Crear un nuevo documento PDF usando jsPDF
      const pdf = new jsPDF();
      // Agregar datos al PDF
      pdf.addImage(imgData, "PNG", 5, 10, 190, 0); // Agregar la imagen al PDF
      pdf.save(`Cliente_Lista_Pagos.pdf`); // Descargar el PDF
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };
  //maneja el numero de las paginas de la lista de creditos
  const handleCambioPagina = (NumeroPagina) => {
    setCurrentPage(NumeroPagina);
  };
  //funcion para manejar los estados de las cuotas
  function getColorForEstado(estadoPago) {
    switch (estadoPago) {
      case "Pendiente":
        return "orange"; // Anaranjado
      case "Retraso":
        return "red"; // Rojo
      case "Pagado":
        return "green"; // Verde
      default:
        return "black"; // Negro (o cualquier otro color predeterminado)
    }
  }
  //funcion para manejar el docle click de una cuota o fecha de pago
  //al dar doble click se rellenan los campos de  Monto y fecha a pagar de 
  //nuestro formulario de pago
  function handleCuotaDoubleClick (montoCuota, fechaPago) {
    setMontoCuotaSeleccionada(montoCuota);
    setFechaPago(fechaPago);
  };

  return (
    <>
      <div>
        <h1 className="title">Lista de Créditos</h1>
        {creditos && (
          <div className="table-responsive">
            <table className="m-tabla table table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Monto</th>
                  <th>Meses</th>
                  <th>Periodo</th>
                  <th>fecha Inicio</th>
                  <th>intereses %</th>
                  <th>Ver detalles</th>
                </tr>
              </thead>
              <tbody>
                {creditos
                  .slice(
                    (currentPage - 1) * creditsPerPage,
                    currentPage * creditsPerPage
                  )
                  .map((credito) => (
                    <tr key={credito.idCredito}>
                      <td>{credito.idCredito}</td>
                      <td>{credito.Nombre}</td>
                      <td>{credito.titulo}</td>
                      <td>{credito.descripcion}</td>
                      <td>L.{credito.Monto}</td>
                      <td>{credito.Meses}</td>
                      <td>{credito.Periodo}</td>
                      <td>{credito.fechainicio}</td>
                      <td>{credito.intereses}%</td>
                      <td>
                        <button
                          type="button"
                          className="my-button btn btn-outline-info"
                          onClick={() => handleCreditClick(credito.idCredito)}
                        >
                          <i class="bi bi-search "></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <nav className="navbars-pagination" aria-label="Page navigation">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handleCambioPagina(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(creditos.length / creditsPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handleCambioPagina(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(creditos.length / creditsPerPage)
                    }
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
        {/* Renderizar detalle del crédito y tabla de amortización */}
        {selectedCredit && creditDetails && (
          <div>
            {/* Mostrar el formulario de pago */}
            <Pagos
              idCredito={selectedCredit}
              montoCuotaSeleccionada={montoCuotaSeleccionada}
              fechaCuotaSeleccionada={fechaCuotaSeleccionada}
            />

            <div>
              <button
                style={{ marginLeft: "300px", marginTop: "50px" }}
                onClick={handleDescargarPDF}
                className="btn btn-info"
                type="button"
              >
                Descargar PDF
              </button>
              <div ref={tableRef}>
                <div className="table-containers">
                  <div className="credit-details">
                    <h4>Detalle del Crédito</h4>
                    {creditDetails.detalleCreditos.map((detalle) => (
                      <div key={detalle.idCredito} className="credit-details">
                        <div className="details">
                          <div className="row g-2">
                            <div className="col-md-5">
                              <strong>Nombre:</strong> {detalle.Nombre}
                            </div>
                            <div className="col-md-5">
                              <strong>Telefono:</strong> {detalle.Telefono}
                            </div>
                          </div>
                          <div className="row g-1">
                            <div className="col-md-5">
                              <strong>Fecha de inicio:</strong>{" "}
                              {detalle.fechainicio}
                            </div>
                            <div className="col-md-5">
                              <strong>Descripcion:</strong>{" "}
                              {detalle.descripcion}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="m-tabla">
                  <h2>Tabla de Amortización</h2>
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th>Fecha de Pago</th>
                          <th>Interés</th>
                          <th>Capital</th>
                          <th>Cuota</th>
                          <th>Saldo Pendiente</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tablaAmortizacion.map((item, index) => (
                          <tr
                            key={index}
                            onDoubleClick={
                              () =>
                                handleCuotaDoubleClick(
                                  item.cuota,
                                  item.fechaPago
                                ) // Pasa el monto de la cuota y la fecha de pago
                            }
                          >
                            <td>{item.fechaPago}</td>
                            <td>{item.interes}</td>
                            <td>{item.capital}</td>
                            <td>{item.cuota}</td>
                            <td>{item.saldoPendiente}</td>
                            <td
                              style={{
                                color: getColorForEstado(item.estadoPago),
                              }}
                            >
                              {item.estadoPago}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreditList;
