import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import { ButtonsStyled } from "./Buttons.style";
import { Dialog } from "./Dialog";

export const Buttons = () => {
  const { help, isUsedHelp, level, points } = useContext(GameContext);

  const [isOpenDialogRestart, setIsOpenDialogRestart] = useState(false);
  const [isOpenDialogSkipWord, setIsOpenDialogSkipWord] = useState(false);
  const [isOpenDialogChangeLevel, setIsOpenDialogChangeLevel] = useState(false);

  return (
    <>
      <ButtonsStyled>
        <Button
          onClick={() => {
            setIsOpenDialogRestart(true);
          }}
          small
          scheme="primary"
          className="restart"
        >
          Reiniciar
        </Button>
        <Button
          onClick={() => {
            setIsOpenDialogSkipWord(true);
          }}
          small
          disabled={points < 200}
          scheme="primary"
          className="skip"
        >
          Pular 🤩
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
          Ajuda 😍
        </Button>
        <Button
          onClick={() => level !== 1 && setIsOpenDialogChangeLevel(true)}
          small
          scheme={level === 1 ? "primary" : "secondary"}
        >
          Fácil
        </Button>
        <Button
          onClick={() => level !== 2 && setIsOpenDialogChangeLevel(true)}
          small
          scheme={level === 2 ? "primary" : "secondary"}
        >
          Difícil
        </Button>
      </ButtonsStyled>
      <Dialog.ChangeLevel
        open={isOpenDialogChangeLevel}
        setOpen={setIsOpenDialogChangeLevel}
      />
      <Dialog.SkipWord
        open={isOpenDialogSkipWord}
        setOpen={setIsOpenDialogSkipWord}
      />
      <Dialog.Restart
        open={isOpenDialogRestart}
        setOpen={setIsOpenDialogRestart}
      />
    </>
  );
};
