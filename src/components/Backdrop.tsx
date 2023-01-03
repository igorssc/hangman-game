import useEvent from "@react-hook/event";
import { ChangeEvent, useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { BackdropStyled, GameOver, Winner } from "./Backdrop.style";
import { Button } from "./Button";
import { Fireworks } from "./Fireworks";

export const Backdrop = () => {
  const {
    numErrors,
    restart,
    secretWord,
    isPlaying,
    isRecord,
    points,
    registerRecord,
  } = useContext(GameContext);

  useEvent(
    document.querySelector("body"),
    "keydown",
    (event) => (event.key === "Escape" || event.key === "Enter") && restart()
  );

  const [name, setName] = useState("");

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const CurrentName = event.target.value;

    if (CurrentName.length > 15) return;

    setName(CurrentName);
  };

  const handleNewRecord = () => {
    registerRecord(name);
  };

  return (
    <>
      <BackdropStyled>
        {!isPlaying && numErrors < 6 && (
          <Winner>
            <h1>Vitória</h1>
            <br />
            <h2>{true && "Você acertou a palavra, parabéns!"}</h2>
            <Button onClick={() => restart()} scheme="secondary">
              Continuar
            </Button>
            <Fireworks />
          </Winner>
        )}
        {!isPlaying && numErrors > 5 && (
          <GameOver>
            <h1>Você perdeu :&#40;</h1>
            <h2>A palavra era: {secretWord}</h2>
            <br />
            {isRecord && (
              <div className="record">
                <h3>Você entrou pros recordes!!</h3>
                <h4>Sua pontuação: {points}</h4>
                <div>
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={handleName}
                  />
                  <button onClick={handleNewRecord}>
                    <span>✔️</span>
                  </button>
                </div>
              </div>
            )}
            <Button onClick={() => restart()} scheme="secondary">
              Jogar novamente
            </Button>
          </GameOver>
        )}
      </BackdropStyled>
    </>
  );
};
