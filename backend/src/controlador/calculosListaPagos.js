const express = require("express");
const moment = require("moment"); // Asegúrate de tener moment instalado



/*
function calcularTablaConAbonos(
  tablaSinAbonos,
  cuotaNivelada,
  intereses,
  Periodo,
  abonos,

) {
  console.log("intereses", intereses);
  console.log("Periodo", Periodo);
  const tablaAmortizacionConAbonos = [];
  let saldo = tablaSinAbonos[0].saldoPendiente;
 console.log("saldo", saldo);
  // Calcula la tasa de interés para el período
  const tasaInteresPeriodo =
    intereses /
    100 /
    (Periodo === "quincenal" ? 24 : Periodo === "semanal" ? 52 : 12);

  for (let i = 0; i < tablaSinAbonos.length; i++) {
    const cuotaSinAbono = tablaSinAbonos[i];
    const cuotaAmortizacionConAbono = { ...cuotaSinAbono };

    if (abonos.length > 0) {
      const abono = abonos[0];

      if (abono.fechaAbono <= cuotaSinAbono.fechaPago) {
        const abonoMonto = parseFloat(abono.montoAbono);

        // Calcula el nuevo saldo después del abono
        saldo -= abonoMonto;

        // Calcula el interés a pagar en el período actual
        const interesPago = saldo * tasaInteresPeriodo;

        // Calcula el capital a pagar en el período actual
        const cuotaNueva = cuotaNivelada - interesPago;
        const capitalPago = cuotaNueva ;

        // Actualiza los valores en la cuota recalculada
        cuotaAmortizacionConAbono.cuota = cuotaNueva.toFixed(2);
        cuotaAmortizacionConAbono.interes = interesPago.toFixed(2);
        cuotaAmortizacionConAbono.capital = capitalPago.toFixed(2);
        cuotaAmortizacionConAbono.saldoPendiente = saldo.toFixed(2);
        cuotaAmortizacionConAbono.montoAbono = abonoMonto.toFixed(2);

        // Recalcula las cuotas posteriores en base al nuevo saldo
        for (let j = i + 1; j < tablaSinAbonos.length; j++) {
          const cuotaPosterior = tablaSinAbonos[j];
          const nuevoSaldoPendiente =
            parseFloat(cuotaPosterior.saldoPendiente) - capitalPago;

          cuotaPosterior.capital = nuevoSaldoPendiente; // Se actualiza el capital con el nuevo saldo
          cuotaPosterior.cuota = (
            parseFloat(cuotaPosterior.capital) +
            parseFloat(cuotaPosterior.interes)
          ).toFixed(2);
          cuotaPosterior.saldoPendiente = nuevoSaldoPendiente.toFixed(2);

          // Actualiza el saldo para el próximo ciclo
          saldo = nuevoSaldoPendiente;
        }

        abonos.shift();
      }
    }

    tablaAmortizacionConAbonos.push(cuotaAmortizacionConAbono);
  }

  return tablaAmortizacionConAbonos;
}*/
exports.calcularCuotaNivelada = (intereses, Periodo, Monto, Meses) => {
  // Calcula la tasa de interés mensual como porcentaje decimal
  const tasaInteresMensual = intereses / 100 / 12;
  // Calcula el número total de pagos en base a los meses y el período
  const pagosTotales =
    Meses * (Periodo === "quincenal" ? 2 : Periodo === "semanal" ? 4 : 1);

  // Calcula la cuota nivelada utilizando la fórmula de la anualidad
  // donde tasaInteresMensual es la tasa de interés mensual como porcentaje decimal
  // y Monto es el monto del crédito
  const cuotaNivelada =
    (tasaInteresMensual * Monto) /
    (1 - Math.pow(1 + tasaInteresMensual, -pagosTotales));

  // Devuelve el valor calculado de la cuota nivelada
  return cuotaNivelada;
};


// Función para calcular tabla de amortización sin abonos
function calcularTabla(
  Monto,
  cuotaNivelada,
  intereses,
  Meses,
  Periodo,
  pagos,
  fechaInicio,
  
) {
  const tablaAmortizacion = [];
  let saldo = Monto;
  let totalPagado = 0;
  let fechaActual = moment().format("YYYY-MM-DD");

  // Calcula la cantidad total de pagos según el periodo
  const pagosTotales =
    Meses * (Periodo === "quincenal" ? 2 : Periodo === "semanal" ? 4 : 1);

  // Calcula la tasa de interés para el período
  const tasaInteresPeriodo =
    intereses /
    100 /
    (Periodo === "quincenal" ? 24 : Periodo === "semanal" ? 52 : 12);

  // Crear un conjunto de fechas de pagos realizados para búsqueda eficiente
  const fechasPagosRealizados = new Set();
  if (pagos && Array.isArray(pagos)) {
    pagos.forEach((pago) => {
      if (pago.fechaPago) {
        fechasPagosRealizados.add(pago.fechaPago);
      }
    });
  }
  console.log("fechasPagosRealizados", fechasPagosRealizados);
  // Itera sobre cada pago (cuota)
  for (let i = 1; i <= pagosTotales; i++) {
    // Calcula el interés a pagar en el período actual
    const interesPago = saldo * tasaInteresPeriodo;

    // Calcula el capital a pagar en el período actual
    const capitalPago = cuotaNivelada - interesPago;

    // Calcula el saldo pendiente utilizando la fórmula
    const saldoPendiente = Math.max(saldo - capitalPago, 0);

    // aqui se manejan 3 estados para las cuotas
    //Inicializar como pendiente
    let estadoPago = "Pendiente";
    if (fechasPagosRealizados.has(moment(fechaInicio).format("YYYY-MM-DD"))) {
      estadoPago = "Pagado";
    } else if (moment(fechaInicio).isBefore(fechaActual)) {
      estadoPago = "Retraso";
    }

    // Agrega los valores calculados a la tablaAmortizacion
    // Agrega los valores calculados a la tablaAmortizacion
    if (i === pagosTotales) {
      // Ajustar la última cuota al saldo pendiente del penúltimo pago
      const ultimaCuota = saldo;
      tablaAmortizacion.push({
        fechaPago: moment(fechaInicio).format("YYYY-MM-DD"),
        interes: interesPago.toFixed(2),
        capital: ultimaCuota.toFixed(2),
        cuota: (interesPago + ultimaCuota).toFixed(2),
        estadoPago: estadoPago,
        saldoPendiente: "0.00",
      });
    } else {
      saldo -= capitalPago;
      // Resta el capital pago al saldo pendiente en los pagos anteriores
      tablaAmortizacion.push({
        fechaPago: moment(fechaInicio).format("YYYY-MM-DD"),
        interes: interesPago.toFixed(2),
        capital: capitalPago.toFixed(2),
        cuota: cuotaNivelada.toFixed(2),
        //montoAbono: "0.00",
        estadoPago: estadoPago,
        saldoPendiente: saldoPendiente.toFixed(2),
      });
    }
    // Verificar si el estado es "Pendiente" y si se ha registrado un pago para esta fecha
    if (
      estadoPago === "Pendiente" ||
      (estadoPago === "Retraso" &&
        pagos.some(
          (p) => p.fechaPago === moment(fechaInicio).format("YYYY-MM-DD")
        ))
    ) {
      estadoPago = "Pagado"; // Cambiar a "Pagado" si se ha registrado un pago
    }
    totalPagado += capitalPago; // Suma el capital al total pagado

    // Avanza la fecha de inicio según el período (mensual, semanal o quincenal)
    if (Periodo === "mensual") {
      fechaInicio = moment(fechaInicio).add(1, "months").toDate();
    } else if (Periodo === "semanal") {
      fechaInicio = moment(fechaInicio).add(1, "weeks").toDate();
    } else if (Periodo === "quincenal") {
      fechaInicio = moment(fechaInicio).add(2, "weeks").toDate();
    }

    saldo = saldoPendiente; // Actualiza el saldo para la siguiente cuota

    // Si el saldo pendiente es 0, termina la generación de la tabla
    if (saldo === 0) {
      break;
    }
  }

  return tablaAmortizacion;
}



function calcularTablaConAbonos(tablaSinAbonos, abonos, intereses, Periodo) {
  const tablaAmortizacionConAbonos = [];
  let saldo = 0;
  for (let i = 0; i < tablaSinAbonos.length; i++) {
    const cuotaSinAbono = tablaSinAbonos[i];
    const cuotaAmortizacionConAbono = { ...cuotaSinAbono };
    console.log("cuotaSinAbono", cuotaSinAbono);
    console.log("iteracion", i);
    
    if (abonos.length > 0) {
      const abono = abonos[0];
      if (abono.fechaAbono <= cuotaSinAbono.fechaPago) {
        const abonoMonto = parseFloat(abono.montoAbono);
        // Calcula el nuevo saldo después del abono
        console.log("montoAbono", abonoMonto);
        const saldoAntesAbono = parseFloat(
          i > 0
            ? tablaSinAbonos[i - 1].saldoPendiente
            : cuotaSinAbono.saldoPendiente
        );
        console.log("saldoAntesAbono", saldoAntesAbono);

        // Calcula la tasa de interés para el período
        const tasaInteresPeriodo =
          intereses /
          100 /
          (Periodo === "quincenal" ? 24 : Periodo === "semanal" ? 52 : 12);
        // Calcula el interés a pagar en el período actual
        const interesPago = saldoAntesAbono * tasaInteresPeriodo;

        console.log("interesPago", interesPago);

        //const capitalPago = parseFloat(cuotaSinAbono.capital);
        const capitalPago = cuotaAmortizacionConAbono.cuota - interesPago;

        console.log("capitalPago", capitalPago);

        // Calcula el saldo pendiente después de aplicar el abono
        saldo = Math.max(saldoAntesAbono - capitalPago- abonoMonto, 0);

        console.log("saldo depues del abono", saldo);

        // Actualiza los valores en la cuota recalculada
        cuotaAmortizacionConAbono.interes = interesPago.toFixed(2);
        cuotaAmortizacionConAbono.capital = capitalPago.toFixed(2);
        cuotaAmortizacionConAbono.saldoPendiente = saldo.toFixed(2);
        //cuotaAmortizacionConAbono.montoAbono = abonoMonto.toFixed(2);

        // Recalcula las cuotas posteriores en base al nuevo saldo
        for (let j = i + 1; j < tablaSinAbonos.length; j++) {
          const cuotaSiguiente = tablaSinAbonos[j];

          // Calcula el interés a pagar en el período actual para la cuotaSiguiente
          const interesSiguiente = saldo * tasaInteresPeriodo;

          // Calcula el capital a pagar en el período actual para la cuotaSiguiente
          const capitalSiguiente = cuotaSiguiente.cuota - interesSiguiente;
          
          // Calcula el nuevo saldo después de aplicar el capital y el interés
          saldo = Math.max(saldo - capitalSiguiente, 0);

          // Actualiza los valores en la cuotaSiguiente recalculada
          cuotaSiguiente.interes = interesSiguiente.toFixed(2);
          cuotaSiguiente.capital = capitalSiguiente.toFixed(2);
          cuotaSiguiente.saldoPendiente = saldo.toFixed(2);
        }

        abonos.shift();
      }
    }
    tablaAmortizacionConAbonos.push(cuotaAmortizacionConAbono);
  }
  return tablaAmortizacionConAbonos;
}


exports.generarTablaAmortizacion = (
  Monto,
  cuotaNivelada,
  intereses,
  Meses,
  Periodo,
  abonos,
  pagos,
  fechaInicio
) => {
  const tablaSinAbonos = calcularTabla(
    Monto,
    cuotaNivelada,
    intereses,
    Meses,
    Periodo,
    pagos,
    fechaInicio,
    (saldoInicial = Monto)
  );

  let tablaFinal;

  if (abonos.length === 0) {
    tablaFinal = tablaSinAbonos;
  } else {
    const tablaConAbonos = calcularTablaConAbonos(
      tablaSinAbonos,
      abonos,
      intereses,
      Periodo
    );
    tablaFinal = tablaConAbonos;
  }

  return tablaFinal;
};





/*
exports.generarTablaAmortizacionConAbonos = (
  Monto,
  cuotaNivelada,
  intereses,
  Meses,
  Periodo,
  abonos
) => {
  const tablaAmortizacion = [];
  let saldo = Monto;
  let fechaInicio = new Date();
  let totalPagado = 0;

  // Calcula la cantidad total de pagos según el periodo
  const pagosTotales =
    Meses * (Periodo === "quincenal" ? 2 : Periodo === "semanal" ? 4 : 1);

  let abonoIndex = 0;

  // Itera sobre cada pago (cuota)
  for (let i = 1; i <= pagosTotales; i++) {
    // Calcula la tasa de interés para el período actual
    const tasaInteresPeriodo =
      intereses /
      100 /
      (Periodo === "quincenal" ? 24 : Periodo === "semanal" ? 52 : 12);

    // Calcula el interés a pagar en el período actual
    const interesPago = saldo * tasaInteresPeriodo;

    // Calcula el capital a pagar en el período actual
    const capitalPago = cuotaNivelada - interesPago;

    let abonoAmount = 0; // Inicializa el monto del abono

    // Si hay abono para esta fecha, aplica el abono al saldo
    if (abonoIndex < abonos.length) {
      // Obtiene la fecha programada para el abono actual desde el arreglo de abonos
      const abonoFecha = new Date(abonos[abonoIndex].fechaAbono);

      // Compara si la fecha programada para el abono es menor o igual a la fecha de pago actual
      if (abonoFecha <= fechaInicio) {
        // Si la condición es verdadera, asigna el monto del abono a la variable abonoAmount
        abonoAmount = parseFloat(abonos[abonoIndex].montoAbono);
        // Incrementa el índice del abono para pasar al siguiente abono en la próxima iteración
        abonoIndex++;
      }
    }

    // Calcula el saldo pendiente utilizando la fórmula
    const saldoPendiente = Math.max(
      (capitalPago + abonoAmount - saldo) * -1,
      0
    );

    saldo -= capitalPago; // Reduce el saldo pendiente por el capital

    // Calcula la cuota a pagar en el período actual (antes o después de un abono)
    const cuotaActual =
      abonoAmount > 0
        ? Math.max((capitalPago + abonoAmount - saldoPendiente) * 1, 0)
        : cuotaNivelada;

    // Agrega los valores calculados a la tablaAmortizacion
    tablaAmortizacion.push({
      fechaPago: moment(fechaInicio).format("YYYY-MM-DD"),
      interes: interesPago.toFixed(2),
      capital: capitalPago.toFixed(2),
      cuota: cuotaActual.toFixed(2),
      saldoPendiente: saldoPendiente.toFixed(2),
      montoAbono: abonoAmount.toFixed(2),
    });

    totalPagado += capitalPago + abonoAmount; // Suma el capital y el abono al total pagado

    // Avanza la fecha de inicio según el período (mensual, semanal o quincenal)
    if (Periodo === "mensual") {
      fechaInicio.setMonth(fechaInicio.getMonth() + 1);
    } else if (Periodo === "semanal") {
      fechaInicio.setDate(fechaInicio.getDate() + 7);
    } else if (Periodo === "quincenal") {
      fechaInicio.setDate(fechaInicio.getDate() + 15);
    }

    // Si el saldo pendiente es 0, termina la generación de la tabla
    if (saldo === 0) {
      break;
    }
  }

  // Agrega información de total pagado al final de la tablaAmortizacion
  tablaAmortizacion.push({
    mensaje: "Capital Pagado y Total Pagado",
    capitalPagado: totalPagado.toFixed(2),
    totalPagado: totalPagado.toFixed(2),
  });

  // Retorna los detalles de los créditos y la tabla de amortización generada
  return {
    detalleCreditos: abonos,
    tablaAmortizacion: tablaAmortizacion,
  };
};


*/
















/*
exports.generarTablaAmortizacion = (
  Monto,
  cuotaNivelada,
  intereses,
  Meses,
  Periodo,
) => {
  // Inicializa la tabla de amortización como un arreglo vacío
  const tablaAmortizacion = [];
  // Inicializa el saldo pendiente al monto inicial
  let saldo = Monto;
  // Inicializa la fecha de inicio como la fecha actual
  let fechaInicio = new Date();
  // Calcula el número total de pagos en base a los meses y el período
  const pagosTotales =
    Meses * (Periodo === "quincenal" ? 2 : Periodo === "semanal" ? 4 : 1);

  // Itera desde 1 hasta el número total de pagos
  for (let i = 1; i <= pagosTotales; i++) {
    // Calcula la tasa de interés para el período actual (mensual, quincenal o semanal)
    const tasaInteresPeriodo =
      intereses /
      100 /
      (Periodo === "quincenal" ? 24 : Periodo === "semanal" ? 52 : 12);

    // Calcula el interés a pagar en el período actual
    const interesPago = saldo * tasaInteresPeriodo;
    // Calcula el capital a pagar en el período actual
    let capitalPago = cuotaNivelada - interesPago;
    // Aplica los abonos correspondientes a esta cuota
   

    // Verifica si es la última cuota para ajustar el saldo pendiente a 0
    if (i === pagosTotales) {
      // Ajustar la última cuota al saldo pendiente del penúltimo pago
      const ultimaCuota = saldo;
      tablaAmortizacion.push({
        fechaPago: moment(fechaInicio).format("YYYY-MM-DD"),
        interes: interesPago.toFixed(2),
        capital: ultimaCuota.toFixed(2),
        cuota: (interesPago + ultimaCuota).toFixed(2),
        saldoPendiente: "0.00",
      });
    } else {
      
      saldo -= capitalPago;
      // Resta el capital pago al saldo pendiente en los pagos anteriores
      tablaAmortizacion.push({
        fechaPago: moment(fechaInicio).format("YYYY-MM-DD"),
        interes: interesPago.toFixed(2),
        capital: capitalPago.toFixed(2),
        cuota: cuotaNivelada.toFixed(2),
        saldoPendiente: saldo.toFixed(2),
      });
    }
    console.log("cuota nivelada", cuotaNivelada);
    console.log("intereses", intereses);
    console.log("Monto", Monto);
    console.log("Meses", Meses);
    console.log("Periodo", Periodo);
    console.log("interes de cada cuota", interesPago);
    console.log("capital Pago", capitalPago);
    console.log("saldo pendiente", saldo);

    // Avanza la fecha de inicio según el período (mensual, semanal o quincenal)
    if (Periodo === "mensual") {
      fechaInicio.setMonth(fechaInicio.getMonth() + 1);
    } else if (Periodo === "semanal") {
      fechaInicio.setDate(fechaInicio.getDate() + 7);
    } else if (Periodo === "quincenal") {
      fechaInicio.setDate(fechaInicio.getDate() + 15);
    }
  }
  // Devuelve la tabla de amortización completa
  return tablaAmortizacion;
};

*/