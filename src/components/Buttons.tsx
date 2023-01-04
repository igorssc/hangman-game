import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import { ButtonsStyled } from "./Buttons.style";
import { Dialog } from "./Dialog";

export const Buttons = () => {
  const { help, isUsedHelp, level, points } = useContext(GameContext);

  const [openDialogRestart, setOpenDialogRestart] = useState(false);
  const [openDialogSkipWord, setOpenDialogSkipWord] = useState(false);
  const [openDialogChangeLevel, setOpenDialogChangeLevel] = useState(false);

  return (
    <>
      <ButtonsStyled>
        <Button
          onClick={() => {
            setOpenDialogRestart(true);
          }}
          small
          scheme="primary"
          className="restart"
        >
          Reiniciar
        </Button>
        <Button
          onClick={() => {
            setOpenDialogSkipWord(true);
          }}
          small
          disabled={points < 200}
          scheme="primary"
          className="help"
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
          onClick={() => level !== 1 && setOpenDialogChangeLevel(true)}
          small
          scheme={level === 1 ? "primary" : "secondary"}
        >
          Fácil
        </Button>
        <Button
          onClick={() => level !== 2 && setOpenDialogChangeLevel(true)}
          small
          scheme={level === 2 ? "primary" : "secondary"}
        >
          Difícil
        </Button>
      </ButtonsStyled>
      <Dialog.ChangeLevel
        open={openDialogChangeLevel}
        setOpen={setOpenDialogChangeLevel}
      />
      <Dialog.SkipWord
        open={openDialogSkipWord}
        setOpen={setOpenDialogSkipWord}
      />
      <Dialog.Restart open={openDialogRestart} setOpen={setOpenDialogRestart} />
    </>
  );
};
