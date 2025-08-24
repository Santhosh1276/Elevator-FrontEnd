// NavBar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "./ThemeProviderWrapper";
function NavBar() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: mode === "light" ? "whitesmoke" : "#2a2626ff", // White in light mode, Black in dark mode
        color: mode === "light" ? "#065b19ff" : "#efcd0aff", // Contrast text color
      }}
      elevation={4}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {/* Header / Brand */}
        <Typography variant="h6" fontWeight="bold">
          🛗 Elevator Dashboard
        </Typography>

        {/* Theme Toggle */}
        <Tooltip
          title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        >
          <IconButton color="inherit" onClick={toggleMode}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
