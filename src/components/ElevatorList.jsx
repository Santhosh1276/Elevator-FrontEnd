// ElevatorList.jsx
import React, { useContext } from "react";
import { ElevatorContext } from "../context/ElevatorContext";
import ElevatorCard from "./ElevatorCard";
import { Grid } from "@mui/material";

function ElevatorList() {
  const { state } = useContext(ElevatorContext);

  return (
    <Grid container>
      {state.elevators.map((e) => (
        <Grid item key={e._id} xs={12} sm={6} md={4}>
          <ElevatorCard elevator={e} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ElevatorList;
