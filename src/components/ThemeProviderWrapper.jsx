// ThemeProviderWrapper.jsx
import React, { useMemo, useState, createContext, useContext } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

export default function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
          background: {
            default: mode === "light" ? "#f4f6f8" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
        },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
