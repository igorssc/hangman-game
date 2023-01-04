import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";

interface DialogPropsRestart {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogRestart = ({ open, setOpen }: DialogPropsRestart) => {
  const { restart, checkRecord, setIsIntentionToRestart } =
    useContext(GameContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reiniciar a partida irá zerar seus pontos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button small autoFocus onClick={handleClose} scheme="secondary">
            Cancelar
          </Button>
          <Button
            small
            onClick={() => {
              const isRecord = checkRecord();
              isRecord && setIsIntentionToRestart(true);
              if (!isRecord) {
                restart({ isTotal: true });
              }

              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Reiniciar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
};

interface DialogPropsSkipWord {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogSkipWord = ({ open, setOpen }: DialogPropsSkipWord) => {
  const { skipWord } = useContext(GameContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pular a palavra te custará 200 pts
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button small autoFocus onClick={handleClose} scheme="secondary">
            Cancelar
          </Button>
          <Button
            small
            onClick={() => {
              skipWord();
              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Pular
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
};

interface DialogPropsChangeLevel {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogChangeLevel = ({ open, setOpen }: DialogPropsChangeLevel) => {
  const { checkRecord, setIsChangingLevels, setLevel, restart, level } =
    useContext(GameContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Alternar os modos irá zerar seus pontos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button small autoFocus onClick={handleClose} scheme="secondary">
            Cancelar
          </Button>
          <Button
            small
            onClick={() => {
              const isRecord = checkRecord();
              isRecord && setIsChangingLevels(true);
              if (!isRecord) {
                setLevel((prev) => (prev === 1 ? 2 : 1));
                restart({ isTotal: true, isRandom: false });

                localStorage.setItem(
                  "p",
                  JSON.stringify({
                    l: level === 1 ? 2 : 1,
                    p: 0,
                  })
                );
              }
              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
};

export const Dialog = {
  Restart: DialogRestart,
  SkipWord: DialogSkipWord,
  ChangeLevel: DialogChangeLevel,
};
