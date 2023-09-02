
function calcularTablaConAbonos(
  tablaSinAbonos, 
  abonos, 
  intereses,
   Periodo) {
  const tablaAmortizacionConAbonos = [];
 let saldo = 0; 
  console.log("saldo", saldo);

  for (let i = 0; i < tablaSinAbonos.length; i++) {
    const cuotaSinAbono = tablaSinAbonos[i];
    const cuotaAmortizacionConAbono = { ...cuotaSinAbono };

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

        // Calcula el nuevo saldo después del abono
        saldo = saldoAntesAbono - abonoMonto;
        console.log("saldo depues del abono", saldo);

        // Calcula la tasa de interés para el período

        const tasaInteresPeriodo =
          intereses /
          100 /
          (Periodo === "quincenal" ? 24 : Periodo === "semanal" ? 52 : 12);
        // Calcula el interés a pagar en el período actual
        const interesPago = saldo * tasaInteresPeriodo;

        //const interesPago = saldo * cuotaSinAbono.tasaInteresPeriodo;
        console.log("interesPago", interesPago);

        const capitalPago = parseFloat(cuotaSinAbono.capital);
        console.log("capitalPago", capitalPago);

        // const capitalPago = parseFloat(tablaSinAbonos[i].capital);

        saldo = Math.max(saldo - capitalPago, 0);
        console.log("saldo", saldo);

        // Actualiza los valores en la cuota recalculada
        cuotaAmortizacionConAbono.interes = interesPago.toFixed(2);
        cuotaAmortizacionConAbono.capital = capitalPago.toFixed(2);
        cuotaAmortizacionConAbono.saldoPendiente = saldo.toFixed(2);

        // Recalcula las cuotas posteriores en base al nuevo saldo
        for (let j = i + 1; j < tablaSinAbonos.length; j++) {
          const cuotaSiguiente = tablaSinAbonos[j];
          const interesSiguiente = saldo * tasaInteresPeriodo;
          const capitalSiguiente = cuotaSiguiente.cuota - interesSiguiente;
          saldo = Math.max(saldo - capitalSiguiente, 0);

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
