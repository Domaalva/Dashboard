import { useState } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from "./components/SelectorUI";
import IndicatorUI from "./components/IndicatorUI";
import useFetchData from "./hooks/useFetchData";
import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dataFetcherOutput = useFetchData(selectedOption);


  return (
    <Grid
      container
      spacing={5}
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid
        container
        size={{ xs: 12, md: 12 }}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI
          city={selectedOption ?? ""}
            onOptionSelect={setSelectedOption}
        />

      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title="Temperatura (2m)"
            description={
              dataFetcherOutput
                ? `${dataFetcherOutput.current.temperature_2m}${dataFetcherOutput.current_units.temperature_2m}`
                : "Cargando..."
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title="Temperatura aparente"
            description={
              dataFetcherOutput
                ? `${dataFetcherOutput.current.apparent_temperature}${dataFetcherOutput.current_units.apparent_temperature}`
                : "Cargando..."
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title="Velocidad del viento"
            description={
              dataFetcherOutput
                ? `${dataFetcherOutput.current.wind_speed_10m}${dataFetcherOutput.current_units.wind_speed_10m}`
                : "Cargando..."
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title="Humedad relativa"
            description={
              dataFetcherOutput
                ? `${dataFetcherOutput.current.relative_humidity_2m}${dataFetcherOutput.current_units.relative_humidity_2m}`
                : "Cargando..."
            }
          />
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <ChartUI data={dataFetcherOutput} />
      </Grid>

      {/* Tabla */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <TableUI data={dataFetcherOutput} />
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>
        Elemento: Información adicional
      </Grid>
    </Grid>
  );
}

export default App;
