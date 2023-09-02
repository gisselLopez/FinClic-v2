import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import {useQuery,useMutation,} from "react-query";
import DatePicker from "react-datepicker";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Importa esta extensión para tablas en jsPDF
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/credito/creditoform.css"

const RegistroCredito = () => {
  const [selectedClienteId, setSelectedClienteId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [Monto, setMonto] = useState("");
  const [Meses, setMeses] = useState("");
  const [Periodo, setPeriodo] = useState("mensual");
  const [fechainicio, setFechaInicio] = useState("");
  const [intereses, setIntereses] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState(""); // Agrega el estado para el teléfono del cliente
  const [tablaAmortizacion, setTablaAmortizacion] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const tableRef = useRef(null); // Definir tableRef aquí

  const handleCalcular = useMutation(async () => {
    // Realiza una llamada al backend para calcular la tabla de amortización
    try {
      const response = await fetch(
        `http://localhost:3001/auth/tabla/generar-tabla-amortizacion?Monto=${Monto}&intereses=${intereses}&Meses=${Meses}&Periodo=${Periodo}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al calcular la tabla de amortización");
      }
      const data = await response.json();
      // Agrega un console.log para verificar la respuesta recibida
      console.log("Datos recibidos del backend:", data);
      // Actualiza el estado con la tabla de amortización calculada
      //el spread operator [...data] sirve para crear una copia del arreglo recibido del backend antes de actualizar el estado.
      //Esto puede ayudar a evitar problemas de mutación directa del estado.
      setTablaAmortizacion(data);
      setMostrarTabla(true); // Mostrar la tabla después de calcular
      console.log(
        "Estado actualizado de tablaAmortizacion:",
        tablaAmortizacion
      );
    } catch (error) {
      console.error("Error al calcular la tabla de amortización:", error);
    }
  });
  const handleCotizarClick = async () => {
    try {
      const data = await handleCalcular.mutateAsync();
      if (Array.isArray(data)) {
        setTablaAmortizacion(data); // Actualiza el estado con una copia del arreglo recibido
        handleToggleTabla(); // Mostrar la tabla después de calcular
        console.log("Estado actualizado de tablaAmortizacion:", data);
      }
    } catch (error) {
      console.error("Ha ocurrido un error", error);
    }
  };
  const handleToggleTabla = () => {
    setMostrarTabla(!mostrarTabla); // Cambiar el estado para mostrar/ocultar la tabla
  };

  const handleDescargarPDF = async () => {
    // Crea un blob con el contenido del PDF
    try {
      console.log("Iniciando descarga del PDF");

      // Generar una imagen desde la tabla usando html2canvas
      const canvas = await html2canvas(tableRef.current);
      const imgData = canvas.toDataURL("image/png");

      // Crear un nuevo documento PDF usando jsPDF
      const pdf = new jsPDF();
      // Datos del crédito y cliente
      const datosCredito = {
        nombreCliente: selectedClienteId,
        telefonoCliente: selectedClienteId,
        titulo,
        descripcion,
        Monto: parseFloat(Monto),
        Meses: parseInt(Meses),
        Periodo: Periodo,
        fechainicio: fechainicio, // Puedes enviar la fecha actual o la fecha deseada para el inicio del crédito
        intereses: parseFloat(intereses),
      };

      // Agregar datos al PDF
      pdf.text(`Nombre cliente: ${datosCredito.nombreCliente}`, 10, 10);
      pdf.text(`Teléfono: ${datosCredito.telefonoCliente}`, 10, 20);
      pdf.text(`Fecha de Inicio: ${datosCredito.fechainicio}`, 10, 30);
      pdf.text(`Título: ${datosCredito.titulo}`, 10, 40);
      pdf.text(`Descripción: ${datosCredito.descripcion}`, 10, 50);
      pdf.text(`Monto: ${datosCredito.Monto}`, 10, 60); // Ajusta las coordenadas según necesites
      pdf.text(`Intereses: ${datosCredito.intereses}` + intereses, 10, 70); // Ajusta las coordenadas según necesites
      pdf.text(`Meses: ${datosCredito.Meses}`, 10, 80); // Ajusta las coordenadas según necesites
      pdf.text(`Período: ${datosCredito.Periodo} `, 10, 90); // Ajusta las coordenadas según necesites
      pdf.text(`Tabla de amortizacion`, 10, 100); // Ajusta las coordenadas según necesites
      pdf.addImage(imgData, "PNG", 10, 110, 190, 0); // Agregar la imagen al PDF
      pdf.save(`Lista_Pagos.pdf`); // Descargar el PDF
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  // Utiliza React Query para obtener la lista de clientes
  const clientes = useQuery("clientes", async () => {
    // Realiza una solicitud HTTP GET para registrar un crédito en el servidor
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
    return response.json();
  });
  console.log("Clientes:", clientes); // Agrega el console.log aquí para ver los datos

  //useMutation es un hook que es una herramienta popular para manejar el estado de datos
  //facilita el proceso de realizar solicitudes de mutación a un servidor y manejar las respuestas y posibles errores
  // Utiliza React Query para registrar el crédito
  const registrarCreditoMutation = useMutation(
    async (data) => {
      // Realiza una solicitud HTTP POST para registrar un crédito en el servidor
      const response = await fetch(
        "http://localhost:3001/auth/credito/registrar-credito",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // Convierte los datos en formato JSON y los agrega al cuerpo de la solicitud
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      return response.json();
    },
    {
      // Configuración de lo que sucede después del éxito o el error de la mutación
      onSuccess: () => {
        alert("Registro exitoso");
        console.log("Registro exitoso");
        // Realizar acciones adicionales después del registro exitoso
      },
      onError: (error) => {
        alert("Error en el registro: " + error.message);
        console.error("Error en el registro:", error);
        // Realizar acciones adicionales en caso de error de registro
      },
    }
  );
  // Una función que se llama cuando el valor de un elemento del formulario cambia
  const handleClienteChange = (e) => {
    // Obtiene el valor actual (seleccionado) del elemento del formulario que generó el evento
    // En este contexto, se está asumiendo que esta función se utiliza para manejar cambios en un elemento de selección, como un <select> en un formulario.
    const clienteId = e.target.value;
    // Establece el valor actual (clienteId) como estado usando la función setSelectedClienteId
    // Esto significa que se actualiza el valor de un estado llamado 'selectedClienteId' con el valor del cliente seleccionado en el formulario.
    setSelectedClienteId(clienteId);
    // Aquí podrías buscar el cliente correspondiente en la lista de clientes
    // y obtener su número de teléfono
    const selectedCliente = clientes.data.find(
      (cliente) => cliente.nombreCliente === clienteId,
      (cliente) => cliente.telefono === clienteId
    );
    if (selectedCliente) {
      setTelefonoCliente(selectedCliente.telefono);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica si alguno de los campos requeridos está vacío
    if (
      !selectedClienteId ||
      !titulo ||
      !descripcion ||
      !Monto ||
      !Meses ||
      !fechainicio ||
      !intereses
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    // Verifica si el cliente seleccionado es válido
    // Si todos los campos requeridos están completos, crea un objeto 'data' con los valores del formulario
    const data = {
      nombreCliente: selectedClienteId,
      titulo,
      descripcion,
      Monto: parseFloat(Monto),
      Meses: parseInt(Meses),
      Periodo: Periodo,
      fechainicio: fechainicio, // Puedes enviar la fecha actual o la fecha deseada para el inicio del crédito
      intereses: parseFloat(intereses),
    };

    registrarCreditoMutation.mutate(data);
    //handleCalcular();
    //togglePdfVisible(true);
    setTitulo();
    setDescripcion("");
    setSelectedClienteId("");
    setMonto("");
    setMeses("");
    setFechaInicio("");
    setPeriodo("");
  };

  return (
    <div className="my-container d-flex align-items-center justify-content-center">
      <div className="my-form-primary p-4">
        <h3 className="text-center mb-4">Registrar crédito</h3>
        <div className="row">
          <div className="col-md-18">
            <Form onSubmit={handleSubmit}>
              {/* Fila 1 */}
              <div className="row mb-2">
                <div className="col-md-6">
                  {/* Título */}
                  <Form.Group controlId="formTitulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  {/* Nombre del Cliente */}
                  <Form.Group controlId="formNombreCliente">
                    <Form.Label>Nombre del Cliente</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedClienteId}
                      onChange={handleClienteChange}
                    >
                      <option value="">Seleccionar cliente</option>
                      {Array.isArray(clientes.data) &&
                        clientes.data.map((cliente) => (
                          <option
                            key={cliente.nombreCliente}
                            value={cliente.nombreCliente}
                          >
                            {cliente.Nombre}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>

              {/* Fila 2 */}
              <div className="row mb-2">
                <div className="col-md-12">
                  {/* Descripción */}
                  <Form.Group controlId="formDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* Fila 3 */}
              <div className="row mb-2">
                <div className="col-md-4">
                  {/* Precio */}
                  <Form.Group controlId="formMonto">
                    <Form.Label>Monto</Form.Label>
                    <Form.Control
                      type="number"
                      value={Monto}
                      onChange={(e) => {
                        setMonto(e.target.value);
                        handleCotizarClick();
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  {/* Intereses */}
                  <Form.Group controlId="formMonto">
                    <Form.Label>Interes</Form.Label>
                    <Form.Control
                      type="number"
                      value={intereses}
                      onChange={(e) => {
                        setIntereses(e.target.value);
                        handleCotizarClick();
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  {/* Meses */}
                  <Form.Group controlId="formMeses">
                    <Form.Label>Meses</Form.Label>
                    <Form.Control
                      type="number"
                      value={Meses}
                      onChange={(e) => {
                        setMeses(e.target.value);
                        handleCotizarClick();
                      }}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* Fila 4 */}
              <div className="row mb-2">
                <div className="col-md-4">
                  {/* Fecha de Inicio */}
                  <Form.Group controlId="formFechaInicio">
                    <Form.Label>Fecha de Inicio</Form.Label>
                    <br />
                    <DatePicker
                      selected={fechainicio}
                      onChange={(date) => {
                        setFechaInicio(date);
                        handleCotizarClick();
                      }}
                      dateFormat="yyyy-MM-dd"
                      className="datepicker"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  {/* Período */}
                  <Form.Group controlId="formPeriodo">
                    <Form.Label>Período</Form.Label>
                    <Form.Control
                      as="select"
                      value={Periodo}
                      onChange={(e) => {
                        setPeriodo(e.target.value);
                        handleCotizarClick();
                      }}
                    >
                      <option value="quincenal">Quincenal</option>
                      <option value="mensual">Mensual</option>
                      <option value="semanal">Semanal</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>

              {/* Fila 5 */}
              <div className="row mb-2">
                {/* Fila 7 */}
                <div className="col-md-6">
                  {/* Botón cotizar Crédito */}
                  <div className="d-grid">
                    <button
                      onClick={handleToggleTabla}
                      className="btn btn-info"
                      type="button"
                    >
                      {mostrarTabla ? "Ocultar Tabla" : "Cotizar"}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Botón Registrar Crédito */}
                  <div className="d-grid">
                    <Button type="submit" className="btn btn-info">
                      Crear Crédito
                    </Button>
                  </div>
                </div>
              </div>

              {/* Fila 6 */}
            </Form>
            <div>
              {/* Visualización de la tabla de amortización */}
              <div>
                {tablaAmortizacion && Array.isArray(tablaAmortizacion) && (
                  <div>
                    {mostrarTabla && (
                      <div className="super-container">
                        <h2 className="table-title">Tabla de Amortización </h2>

                        <div>
                          <button
                            onClick={handleDescargarPDF}
                            className="btn btn-info"
                            type="button"
                          >
                            Descargar PDF
                          </button>
                        </div>
                        <table
                          ref={tableRef}
                          className="table table-hover table-bordered"
                        >
                          <thead class="table-info">
                            <tr>
                              <th>Fecha de Pago</th>
                              <th>Interés</th>
                              <th>Capital</th>
                              <th>Cuota</th>
                              <th>Saldo Pendiente</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tablaAmortizacion.map((pago, index) => (
                              <tr key={index}>
                                <td>{pago.fechaPago}</td>
                                <td>{pago.interes}</td>
                                <td>{pago.capital}</td>
                                <td>{pago.cuota}</td>
                                <td>{pago.saldoPendiente}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistroCredito;
