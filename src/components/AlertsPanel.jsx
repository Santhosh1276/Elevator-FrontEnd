// AlertsPanel.jsx
import React, { useContext } from "react";
import { ElevatorContext } from "../context/ElevatorContext";
import { Paper, Typography, List, ListItem } from "@mui/material";

function AlertsPanel() {
  const { state } = useContext(ElevatorContext);
  console.log("state >>>",state)
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Alerts</Typography>
      <List>
        {state.alerts.map((a, i) => (
          <ListItem key={i}>
            {a.severity}: {a.message}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default AlertsPanel;
