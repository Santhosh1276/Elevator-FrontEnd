import React, { useContext, useState } from "react";
import { ElevatorContext } from "../context/ElevatorContext";
import { startElevator, stopElevator, callElevator } from "../api/elevatorApi";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Grid,
  Divider,
  Tooltip,
  Snackbar,
  Alert,
  Collapse,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ElevatorIcon from "@mui/icons-material/MoveToInbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TelemetryCharts from "./TelemetryCharts";

function ElevatorCard({ elevator }) {
  const { state } = useContext(ElevatorContext);

  // Toast state
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "info",
  });

  // Telemetry toggle state
  const [showTelemetry, setShowTelemetry] = useState(false);

  const showToast = (msg, severity = "success") => {
    setToast({ open: true, msg, severity });
  };

  const handleCloseToast = () => setToast({ ...toast, open: false });

  // Handlers with toast
  const handleStart = async () => {
    await startElevator(elevator._id);
    showToast(`${elevator.name} started`, "success");
  };

  const handleStop = async () => {
    await stopElevator(elevator._id);
    showToast(`${elevator.name} stopped`, "warning");
  };

  const handleCall = async (floor) => {
    await callElevator(elevator._id, floor);
    showToast(`${elevator.name} called to floor ${floor}`, "info");
  };

  const series = state.series[elevator._id] || state.series[elevator.id] || [];

  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          boxShadow: 4,
          m: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <CardHeader
          avatar={<ElevatorIcon color="primary" />}
          title={<Typography variant="h6">{elevator.name}</Typography>}
          subheader={`State: ${elevator.state}`}
          sx={{ pb: 0 }}
        />

        <Divider />

        {/* Info content */}
        <CardContent sx={{ p: 2, pt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Current Floor
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {elevator.currentFloor}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Target
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {elevator.targetFloor ?? "-"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                State
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={
                  elevator.state === "running"
                    ? "green"
                    : elevator.state === "moving"
                    ? "blue"
                    : "red"
                }
              >
                {elevator.state}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                RC (Remote Control)
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={elevator.rc ? "green" : "gray"}
              >
                {elevator.rc ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Mode
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {elevator.mode}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Blocked
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {elevator.isBlocked ? "Yes" : "No"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        {/* Controls */}
        <CardActions
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            px: 2,
            pb: 1,
          }}
        >
          <Tooltip title="Start Elevator">
            <IconButton color="success" onClick={handleStart}>
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Stop Elevator">
            <IconButton color="error" onClick={handleStop}>
              <StopIcon />
            </IconButton>
          </Tooltip>

          {/* Call buttons */}
          <Grid container spacing={1} sx={{ flexGrow: 1, ml: 1 }}>
            {[0, 1, 2, 3, 4].map((f) => (
              <Grid item key={f} xs>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={() => handleCall(f)}
                >
                  {f}
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Telemetry Toggle */}
          <Tooltip title={showTelemetry ? "Hide Telemetry" : "Show Telemetry"}>
            <IconButton
              color="primary"
              onClick={() => setShowTelemetry((prev) => !prev)}
            >
              {showTelemetry ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>

        {/* Telemetry collapsible section */}
        <Collapse in={showTelemetry} timeout="auto" unmountOnExit>
          <CardContent sx={{ p: 1 }}>
            <TelemetryCharts
              series={series}
              title=""
              elevatorState={elevator.state}
            />
          </CardContent>
        </Collapse>
      </Card>

      {/* Snackbar / Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          sx={{ width: "100%" }}
          onClose={handleCloseToast}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ElevatorCard;
