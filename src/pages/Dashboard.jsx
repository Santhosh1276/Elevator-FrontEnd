// Dashboard.jsx
import React from "react";
import ElevatorList from "../components/ElevatorList";
import AlertsPanel from "../components/AlertsPanel";
import { Container, Typography } from "@mui/material";
import NavBar from "../components/NavBar";

function Dashboard() {
  return (
    <>
     <NavBar/>
      <ElevatorList />
      <AlertsPanel />
    </>
  );
}

export default Dashboard;
