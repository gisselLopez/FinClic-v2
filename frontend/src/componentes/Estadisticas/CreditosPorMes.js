import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
//import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
// Registra los elementos y escalas necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Estadisticas = async () => {
   try {
     //// Realiza una solicitud HTTP GET
     const response = await fetch(
       "http://localhost:3001/auth/estadisticas/por-mes",
       {
         method: "GET",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
       }
     );
     if (!response.ok) {
       throw new Error("No se pudieron obtener los datos.");
     }

     return response.json();
   } catch (error) {
     console.error("Error en la consulta:", error);
     throw error;
   } 
};

const LinesChart = () => {
  const { data, status, error } = useQuery("creditosPorMes", Estadisticas);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (status === "success" && data) {
      /* nombreMeses es un arreglo que contiene los nombres de los meses
       en orden (por ejemplo, ["Enero", "Febrero", ..., "Diciembre"]). 
       Esto es para convertir el número del mes (1 para enero, 2 para febrero, etc.)
       en su nombre correspondiente. */
      const nombreMeses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      /*.map() es una función de JavaScript que se utiliza para transformar
       un arreglo en otro. Recorre cada elemento del arreglo y ejecuta 
       una función sobre cada elemento.
       */
      /*basicamente este arreglo (const meses = data.map((item) => nombreMeses[item.mes - 1]);),
      obtiene el número de mes (item.mes) y resta 1 para que coincida 
      con el índice de los meses en el arreglo nombreMeses. Luego, utiliza este
       índice para obtener el nombre del mes correspondiente. */
      const meses = data.map((item) => nombreMeses[item.mes - 1]);
      /* se crea un nuevo arreglo llamado montos que contiene los valores de
       totalMonto de cada objeto en data. */
      const montos = data.map((item) => item.totalMonto);

      /*basicamente estos dos arreglos se utilizan para configurar los datos del gráfico, 
      donde los nombres de los meses se muestran en el eje X 
      y los montos se muestran en el eje Y. */
      const chartData = {
        labels: meses,
        datasets: [
          {
            label: "Créditos por Mes",
            data: montos,
            tension: 0.5,
            fill: true,
            borderColor: "rgb(51, 209, 255)",
            backgroundColor: "rgba(51, 209, 255,0.5)",
            pointRadius: 5,
            pointBorderColor: "rgba(51, 209, 255)",
            pointBackgroundColor: "rgba(51, 209, 255)",
          },
        ],
      };

      setChartData(chartData);
    }
  }, [status, data]);

  return (
    <div style={{ width: "50%", margin: "auto", marginTop:"50px",
     alignContent:"center" }}>
      <h2  style={{marginLeft:"140px", fontFamily:"cursive"}}>
        Estadisticas de creditos por mes
      </h2>
      {status === "loading" && <p>Cargando...</p>}
      {status === "error" && <p>Error: {error.message}</p>}
      {chartData && <Line data={chartData} />}
    </div>
  );
};

export default LinesChart;
