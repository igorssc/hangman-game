import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import { GameProvider } from "./contexts/GameContext";
import { GlobalStyle } from "./global.style";
import { client } from "./lib/apollo";
import { CustomTheme } from "./utils/Theme.style";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GameProvider>
        <ThemeProvider theme={CustomTheme}>
          <SnackbarProvider maxSnack={1}>
            <App />
            <GlobalStyle />
          </SnackbarProvider>
        </ThemeProvider>
      </GameProvider>
    </ApolloProvider>
  </React.StrictMode>
);
