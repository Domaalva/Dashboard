import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

interface SelectorUIProps {
  city: string;
  onCityChange: (city: string) => void;
}

export default function SelectorUI({ city, onCityChange }: SelectorUIProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onCityChange(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="city-select-label">
          Ciudad
        </InputLabel>

        <Select
          labelId="city-select-label"
          id="city-simple-select"
          label="Ciudad"
          value={city}
          onChange={handleChange}
        >
          <MenuItem value="" disabled>
            <em>Seleccione una ciudad</em>
          </MenuItem>

          <MenuItem value="guayaquil">Guayaquil</MenuItem>
          <MenuItem value="quito">Quito</MenuItem>
          <MenuItem value="manta">Manta</MenuItem>
          <MenuItem value="cuenca">Cuenca</MenuItem>
        </Select>
      </FormControl>

      {city && (
        <Typography sx={{ mt: 2 }}>
          Información del clima en{" "}
          <strong>
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </strong>
        </Typography>
      )}
    </>
  );
}