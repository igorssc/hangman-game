import { useContext } from "react";
import { ButtonsFooter } from "./App.style";
import { Backdrop } from "./components/Backdrop";
import { Button } from "./components/Button";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { Letters } from "./components/Letters";
import { GameContext } from "./contexts/GameContext";

export function App() {
  const { level, setLevel, isPlaying, restart } = useContext(GameContext);

  return (
    <>
      {!isPlaying && <Backdrop />}
      <Header />
      <Game />
      <Letters />
      {true && (
        <ButtonsFooter>
          <Button
            onClick={() => {
              restart();
            }}
            small
            scheme="primary"
            className="restart"
          >
            Reiniciar
          </Button>
          <Button
            onClick={() => setLevel(1)}
            small
            scheme={level === 1 ? "primary" : "secondary"}
          >
            Fácil
          </Button>
          <Button
            onClick={() => setLevel(2)}
            small
            scheme={level === 2 ? "primary" : "secondary"}
          >
            Difícil
          </Button>
        </ButtonsFooter>
      )}
    </>
  );
}
