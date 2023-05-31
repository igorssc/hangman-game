import { useContext } from "react";
import { Backdrop } from "./components/Backdrop";
import { Buttons } from "./components/Buttons";
import { Container } from "./components/Container";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { Letters } from "./components/Letters";
import { Records } from "./components/Records";
import { GameContext } from "./contexts/GameContext";

export function App() {
  const { isPlaying, isChangingLevels, isRecord, isIntentionToRestart } =
    useContext(GameContext);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("../sw.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.log("Falha ao registrar o Service Worker:", error);
        });
    });
  }

  return (
    <>
      {!isPlaying && <Backdrop />}
      {isPlaying && isChangingLevels && isRecord && <Backdrop />}
      {isPlaying && isIntentionToRestart && isRecord && <Backdrop />}
      <Container>
        <Header />
        <Game />
        <Letters />
        <Buttons />
        <Records />
      </Container>
    </>
  );
}
