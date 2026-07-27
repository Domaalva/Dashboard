import { useState, useEffect } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

const CITY_COORDS: Record<
  string,
  { latitude: number; longitude: number }
> = {
  guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  quito: { latitude: -0.22, longitude: -78.51 },
  manta: { latitude: -0.96, longitude: -80.73 },
  cuenca: { latitude: -2.9, longitude: -78.98 },
};

interface FetchDataState {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function useFetchData(
  selectedOption: string | null
): FetchDataState {

  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {

      try {
        setLoading(true);
        setError(null);

        const cityKey = selectedOption ?? "guayaquil";

        const cityConfig = CITY_COORDS[cityKey];

        if (!cityConfig) {
          throw new Error("Ciudad no encontrada");
        }

        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const json: OpenMeteoResponse = await response.json();

        setData(json);

      } catch (err) {

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }

        setData(null);

      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [selectedOption]);

  return {
    data,
    loading,
    error,
  };
}
