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
  const { isPlaying, isChangingLevels, isRecord } = useContext(GameContext);

  return (
    <>
      {!isPlaying && <Backdrop />}
      {isPlaying && isChangingLevels && isRecord && <Backdrop />}
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
