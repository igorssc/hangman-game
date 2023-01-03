import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import { GameProvider } from "./contexts/GameContext";
import { GlobalStyle } from "./global.style";
import { CustomTheme } from "./utils/Theme.style";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <ThemeProvider theme={CustomTheme}>
        <div style={{ width: "100%" }}>
          <App />
        </div>
        <GlobalStyle />
      </ThemeProvider>
    </GameProvider>
  </React.StrictMode>
);
