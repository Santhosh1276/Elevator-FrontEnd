// App.jsx
import React from "react";
import { ElevatorProvider } from "./context/ElevatorContext";
import Dashboard from "./pages/Dashboard";
import ThemeProviderWrapper from "./components/ThemeProviderWrapper";

// Root wrapper with Context provider
function App() {
  return (
    <ThemeProviderWrapper>

    <ElevatorProvider>
      <Dashboard />
      </ElevatorProvider>
          </ThemeProviderWrapper>

  );
}

export default App;
