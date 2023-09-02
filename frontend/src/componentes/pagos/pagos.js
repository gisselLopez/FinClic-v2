import React, { useState } from "react";
import { useMutation } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

function Pagos({ idCredito, montoCuotaSeleccionada, fechaCuotaSeleccionada }) {
  const [montoPago, setMontoPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");

  const registroPagos = useMutation(
    async (datosRegistro) => {
      console.log("entrando a la ruta http");

      const response = await fetch(
        "http://localhost:3001/auth/pago/crear/pago",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosRegistro),
        }
      );
      console.log("saliendo de la ruta http");

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      return response.json();
    },
    {
      onSuccess: () => {
        alert("Registro exitoso");
        console.log("Registro exitoso");
        // Realizar acciones adicionales después del registro exitoso
      },
      //onError: Una función que se ejecuta en caso de que ocurra un error durante la mutación.
      onError: (error) => {
        alert("Error al efectuar el pago: " + error.message);
        console.error("Error en el registro:", error);
        // Realizar acciones adicionales en caso de error de registro
      },
    }
  );
  const handlePagos = (e) => {
    e.preventDefault();
    // Verificar el valor de montoPago y fechaPago
    console.log("montoPago:", montoCuotaSeleccionada);
    console.log("fechaPago:", fechaCuotaSeleccionada);
    // Validar que todos los campos estén completados
    if (!montoCuotaSeleccionada || !fechaCuotaSeleccionada) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    const datosRegistro = {
      idCredito,
      montoPago: montoCuotaSeleccionada,
      fechaPago:fechaCuotaSeleccionada,
    };
    console.log("Datos de registro:", datosRegistro); // Verificar los datos que se están enviando

    // Ejecutar la mutación para realizar el registro
    registroPagos.mutate(datosRegistro);

    // Restablecer los valores de los campos del formulario
    // Restablecer los valores de los campos del formulario
    setMontoPago("");
    setFechaPago("");
  };

  return (
    <div style={{marginLeft:"300px"}}>
      <div className="form_container p-8 rounded">
        <h4 className="texts-center mb-2">Efectuar pago</h4>
        <div>
          <div className="row g-2">
            <div class="col-md-5">
              Monto a pagar :
              <input
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="doble click en la tabla de amortizacion sobre la cuota que desea pagar"
                type="number"
                className="form-control"
                placeholder="0"
                value={montoCuotaSeleccionada}
                onChange={(e) => setMontoPago(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              Fecha de pago
              <input
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="doble click en la tabla de amortizacion sobre la fecha"
                value={fechaCuotaSeleccionada}
                onChange={(e) => {
                  setFechaPago(e.target.value);
                }}
                dateFormat="yyyy-MM-dd"
                className="datepicker"
              />
            </div>
          </div>
          <div className="d-flex">
            <button
              onClick={handlePagos}
              className="btn btn-danger"
              type="button"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Pagos;