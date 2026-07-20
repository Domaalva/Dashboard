import { LineChart } from "@mui/x-charts/LineChart";
import Typography from "@mui/material/Typography";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

interface ChartUIProps {
  data: OpenMeteoResponse | null;
}

export default function ChartUI({ data }: ChartUIProps) {
  if (!data) {
    return <p>Cargando gráfico...</p>;
  }

  const labels = data.hourly.time.slice(0, 10);

  const temperatures = data.hourly.temperature_2m.slice(0, 10);

  const humidity = data.hourly.relative_humidity_2m.slice(0, 10);

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura y humedad por hora
      </Typography>

      <LineChart
        height={300}
        series={[
          {
            data: temperatures,
            label: "Temperatura (°C)",
          },
          {
            data: humidity,
            label: "Humedad (%)",
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: labels,
          },
        ]}
      />
    </>
  );
}
