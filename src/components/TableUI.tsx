import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

interface TableUIProps {
  data: OpenMeteoResponse | null;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "hora",
    headerName: "Hora",
    width: 200,
  },
  {
    field: "temperatura",
    headerName: "Temperatura (°C)",
    width: 160,
  },
  {
    field: "humedad",
    headerName: "Humedad (%)",
    width: 140,
  },
  {
    field: "viento",
    headerName: "Viento (km/h)",
    width: 140,
  },
];

export default function TableUI({ data }: TableUIProps) {
  if (!data) {
    return <p>Cargando datos...</p>;
  }

  const rows = data.hourly.time.slice(0, 10).map((time, index) => ({
    id: index,
    hora: time,
    temperatura: data.hourly.temperature_2m[index],
    humedad: data.hourly.relative_humidity_2m[index],
    viento: data.hourly.wind_speed_10m[index],
  }));

  return (
    <Box sx={{ height: 350, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
