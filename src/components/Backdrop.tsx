import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { BackdropStyled, GameOver, Winner } from "./Backdrop.style";
import { Button } from "./Button";
import { Fireworks } from "./Fireworks";

export const Backdrop = () => {
  const { numErrors, restart, secretWord, isPlaying } = useContext(GameContext);

  return (
    <>
      <BackdropStyled>
        {!isPlaying && numErrors < 6 && (
          <Winner>
            <h1>Vitória</h1>
            <br />
            <h2>{true && "Você ganhou!"}</h2>
            <Button onClick={() => restart()} scheme="secondary">
              Jogar novamente
            </Button>
            <Fireworks />
          </Winner>
        )}
        {!isPlaying && numErrors > 5 && (
          <GameOver>
            <h1>Você perdeu :&#40;</h1>
            <h2>A palavra era: {secretWord}</h2>
            <br />
            <Button onClick={() => restart()} scheme="secondary">
              Jogar novamente
            </Button>
          </GameOver>
        )}
      </BackdropStyled>
    </>
  );
};