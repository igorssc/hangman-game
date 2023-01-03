import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import { ButtonsStyled } from "./Buttons.style";

export const Buttons = () => {
  const { restart, help, isUsedHelp, setLevel, level } =
    useContext(GameContext);

  return (
    <>
      <ButtonsStyled>
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
          onClick={() => {
            help();
          }}
          small
          disabled={isUsedHelp}
          scheme="primary"
          className="help"
        >
          Ajuda 🤩
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
      </ButtonsStyled>
    </>
  );
};
