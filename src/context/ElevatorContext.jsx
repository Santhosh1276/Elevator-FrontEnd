// ElevatorContext.jsx
import React, { createContext, useReducer, useEffect, useState } from "react";
import { elevatorReducer, initialState } from "./elevatorReducer";
import { getAllElevators } from "../api/elevatorApi";
import { io } from "socket.io-client";
import { CircularProgress, Box } from "@mui/material";

export const ElevatorContext = createContext();

export function ElevatorProvider({ children }) {
  const [state, dispatch] = useReducer(elevatorReducer, initialState);
  const [loading, setLoading] = useState(true);

  // Fetch elevators once on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllElevators();
        dispatch({ type: "SET_ELEVATORS", payload: data });
      } catch (err) {
        console.error("Failed to fetch elevators:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Socket for real-time snapshots
  useEffect(() => {
    const socket = io("https://elevatory-backend.onrender.com");

    socket.on("snapshot", (snap) => {
      // 1) Update the elevator’s live fields for cards
      dispatch({
        type: "UPDATE_ELEVATOR",
        payload: {
          _id: snap.id,
          currentFloor: snap.currentFloor,
          targetFloor: snap.targetFloor,
          state: snap.state,
          isBlocked: snap.isBlocked,
          ro: snap.ro, // keep latest RO on the elevator too (optional)
        },
      });

      // 2) Append to the chart time-series buffer
      dispatch({
        type: "ADD_SNAPSHOT",
        payload: {
          id: snap.id,
          ts: snap.ts,
          ro: snap.ro, // {motorTempC, ropeTensionN, loadKg, ...}
        },
      });
    });

    return () => socket.disconnect();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <ElevatorContext.Provider value={{ state, dispatch }}>
      {children}
    </ElevatorContext.Provider>
  );
}
