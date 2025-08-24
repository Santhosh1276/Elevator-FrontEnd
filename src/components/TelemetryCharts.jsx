// TelemetryCharts.jsx
import React, { useMemo } from "react";
// Recharts building blocks for a responsive line chart
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
// MUI UI wrappers
import { Card, CardContent, Typography, Box } from "@mui/material";

// Convert a timestamp to a short MM:SS label
function formatTs(ts) {
  const d = new Date(ts);
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function TelemetryCharts({ series, title, elevatorState }) {
  // ✅ Prepare chart data only when allowed states
  const data = useMemo(() => {
    if (!["running", "idle"].includes(elevatorState?.toLowerCase())) {
      return []; // stop/pause → no chart data
    }
    return (series || []).map((pt) => ({
      time: formatTs(pt.ts),
      motorTempC: Number(pt.motorTempC?.toFixed?.(1) ?? pt.motorTempC),
      ropeTensionN: Math.round(pt.ropeTensionN),
      loadKg: Math.round(pt.loadKg),
    }));
  }, [series, elevatorState]);

  // ✅ If not in running/idle → show paused message
  if (!["running", "idle"].includes(elevatorState?.toLowerCase())) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {title || "Telemetry"}
          </Typography>
          <Box
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
              fontStyle: "italic",
            }}
          >
            Telemetry paused (Elevator not active)
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {title || "Telemetry"}
        </Typography>

        {/* Chart 1: Motor Temperature */}
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                label={{ value: "°C", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="motorTempC"
                name="Motor Temp (°C)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Rope Tension */}
        <div style={{ width: "100%", height: 220, marginTop: 16 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                label={{ value: "N", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="ropeTensionN"
                name="Rope Tension (N)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Load (kg) */}
        <div style={{ width: "100%", height: 220, marginTop: 16 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                label={{ value: "kg", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="loadKg"
                name="Load (kg)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
