import Alert from "@mui/material/Alert";

interface AlertConfig {
  description: string;
  severity?: "success" | "error" | "warning" | "info";
  variant?: "outlined" | "filled" | "standard";
}

export default function AlertUI(config: AlertConfig) {
  return (
    <Alert
      severity={config.severity || "success"}
      variant={config.variant || "outlined"}
    >
      {config.description}
    </Alert>
  );
}