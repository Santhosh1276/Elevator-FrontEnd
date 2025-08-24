// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Wrap Material UI theme provider
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

// Dark mode theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThemeProvider theme={darkTheme}> */}
      <CssBaseline /> {/* Reset default CSS */}
      <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
