import { useState, useEffect } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const CITY_COORDINATES: Record<string, Coordinates> = {
  guayaquil: { latitude: -2.17, longitude: -79.92 },
  quito: { latitude: -0.22, longitude: -78.51 },
  manta: { latitude: -0.96, longitude: -80.73 },
  cuenca: { latitude: -2.9, longitude: -78.98 },
};

export default function useFetchData(city: string): OpenMeteoResponse | null {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);

  const getURL = (selectedCity: string): string => {
    const coords = CITY_COORDINATES[selectedCity];
    if (!coords) {
      return "";
    }
    return `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  };

  useEffect(() => {
    if (!city) {
      setData(null);
      return;
    }

    const URL = getURL(city);
    
    const fetchData = async () => {
      const response = await fetch(URL);
      const json: OpenMeteoResponse = await response.json();

      setData(json);
    };

    fetchData();
  }, [city]);

  return data;
}