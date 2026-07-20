import { useState, useEffect } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

const CITY_COORDS: Record<
  string,
  { latitude: number; longitude: number }
> = {
  Guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  Quito: { latitude: -0.22, longitude: -78.51 },
  Manta: { latitude: -0.96, longitude: -80.73 },
  Cuenca: { latitude: -2.9, longitude: -78.98 },
};

export default function useFetchData(
  selectedOption: string | null
): OpenMeteoResponse | null {

  const [data, setData] = useState<OpenMeteoResponse | null>(null);

  useEffect(() => {

    const cityConfig =
      selectedOption !== null
        ? CITY_COORDS[selectedOption]
        : CITY_COORDS["Guayaquil"];

    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Error al obtener datos del clima");
        }

        const json: OpenMeteoResponse = await response.json();

        setData(json);

      } catch (error) {
        console.error(error);
        setData(null);
      }
    };

    fetchData();

  }, [selectedOption]);

  return data;
}
