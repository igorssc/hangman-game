import useEvent from "@react-hook/event";
import { useSnackbar } from "notistack";
import { ChangeEvent, useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import {
  BackdropStyled,
  GameOver,
  RecordStyled,
  Winner,
} from "./Backdrop.style";
import { Button } from "./Button";
import { Fireworks } from "./Fireworks";

export const Backdrop = () => {
  const {
    numErrors,
    restart,
    secretWord,
    isPlaying,
    isRecord,
    isChangingLevels,
    isIntentionToRestart,
  } = useContext(GameContext);

  useEvent(
    document.querySelector("body"),
    "keydown",
    (event) => (event.key === "Escape" || event.key === "Enter") && restart({})
  );

  return (
    <>
      <BackdropStyled>
        {!isPlaying && numErrors < 6 && (
          <Winner>
            <h1>Vitória</h1>
            <h2>{true && "Você acertou a palavra, parabéns!"}</h2>
            <Button onClick={() => restart({})} scheme="secondary">
              Continuar
            </Button>
            <Fireworks />
          </Winner>
        )}
        {!isPlaying && numErrors > 5 && (
          <GameOver>
            <h1>Você perdeu :&#40;</h1>
            <h2>A palavra era: {secretWord}</h2>
            {isRecord && (
              <>
                <br />
                <br />
                <RecordComponent />
              </>
            )}
            {!isRecord && (
              <Button onClick={() => restart({})} scheme="secondary">
                Jogar novamente
              </Button>
            )}
            {isPlaying && isRecord && <RecordComponent />}
          </GameOver>
        )}
        {isPlaying && isChangingLevels && isRecord && numErrors < 6 && (
          <GameOver>
            <RecordComponent />
          </GameOver>
        )}
        {isPlaying && isIntentionToRestart && isRecord && numErrors < 6 && (
          <GameOver>
            <RecordComponent />
          </GameOver>
        )}
      </BackdropStyled>
    </>
  );
};

const RecordComponent = () => {
  const {
    points,
    registerRecord,
    isPlaying,
    isChangingLevels,
    setIsChangingLevels,
    setLevel,
    restart,
    level,
    isIntentionToRestart,
  } = useContext(GameContext);

  const [isButtonActive, setIsButtonActive] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const CurrentName = event.target.value;

    if (CurrentName.length > 15) return;

    setName(CurrentName);
  };

  const handleNewRecord = () => {
    if (!name || name.trim().length < 3) {
      enqueueSnackbar("Por favor, preencha seu nome", { variant: "warning" });
      return;
    }

    setIsButtonActive(false);

    if (isChangingLevels) {
      setLevel((prev) => (prev === 1 ? 2 : 1));
      setIsChangingLevels(false);
      restart({ isTotal: true, isRandom: false });
      localStorage.setItem(
        "p",
        JSON.stringify({ l: level === 1 ? 2 : 1, p: 0 })
      );
    }

    restart({ isTotal: true });

    registerRecord(
      name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()
    );
  };

  return (
    <>
      <RecordStyled>
        <h3>
          {isPlaying
            ? "Você entrou pros records"
            : "...mas entrou pros recordes!!"}
        </h3>
        <h4>Sua pontuação: {points}</h4>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={handleName}
        />

        <Button
          onClick={handleNewRecord}
          scheme="secondary"
          disabled={!isButtonActive}
        >
          Continuar
        </Button>
      </RecordStyled>
    </>
  );
};
