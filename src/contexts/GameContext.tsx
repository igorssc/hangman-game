import useEvent from "@react-hook/event";
import { createContext, ReactNode, useEffect, useState } from "react";
import { removeSpecialCharacters } from "../utils/format";
import { easyWords, hardWords } from "../utils/words";

interface GameProviderProps {
  children: ReactNode;
}

type GameData = {
  points: number;
  tip: string;
  secretWord: string;
  numErrors: number;
  chosenLetters: string[];
  level: 1 | 2;
  setLevel: React.Dispatch<React.SetStateAction<1 | 2>>;
  checkLetter: (letter: string) => void;
  restart: () => void;
  isPlaying: boolean;
};

export const GameContext = createContext({} as GameData);

export function GameProvider({ children }: GameProviderProps) {
  const [points, setPoints] = useState(0);
  const [tip, setTip] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [numErrors, setNumErrors] = useState(0);
  const [chosenLetters, setChosenLetters] = useState<string[]>([]);
  const [level, setLevel] = useState<1 | 2>(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const selectRandomWord = () => {
    const words = level === 1 ? easyWords : hardWords;

    const tipsAvailable = Object.keys(words);

    const tipSelected =
      tipsAvailable[Math.floor(Math.random() * tipsAvailable.length)];

    setTip(tipSelected.charAt(0).toUpperCase() + tipSelected.slice(1));

    const randomWord = () =>
      // @ts-ignore:next-line
      words[tipSelected][Math.floor(Math.random() * words[tipSelected].length)];

    let wordSelected = randomWord().toUpperCase() as string;

    while (wordSelected === secretWord) {
      wordSelected = randomWord().toUpperCase();
    }

    setSecretWord(wordSelected.toUpperCase());
  };

  useEffect(() => {
    selectRandomWord();
  }, []);

  const checkLetter = (letter: string) => {
    if (!removeSpecialCharacters(letter).match(/[A-Za-z]/)) return;

    const secretWordFormated = removeSpecialCharacters(secretWord);

    const isCorrect = secretWordFormated.includes(letter.toUpperCase());

    const currentChosenLetters = [
      ...chosenLetters,
      removeSpecialCharacters(letter).toUpperCase(),
    ];

    if (!isCorrect) {
      setNumErrors((prev) => prev + 1);
    }

    setChosenLetters(currentChosenLetters);

    if (!isCorrect && numErrors === 5) {
      setIsPlaying(false);
    } else {
      const isWinner = secretWordFormated.split("").reduce((prev, l) => {
        if (!currentChosenLetters.includes(l)) {
          return false;
        } else {
          return prev;
        }
      }, true);

      if (isWinner) {
        setIsPlaying(false);
        setPoints((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    restart();
    setPoints(0);
  }, [level]);

  const handleKeyDown = (event: globalThis.KeyboardEvent) => {
    checkLetter(event.key);
  };

  const restart = () => {
    setNumErrors(0);
    setChosenLetters([]);
    selectRandomWord();
    setIsPlaying(true);
  };

  useEvent(document.querySelector("body"), "keydown", (event) =>
    handleKeyDown(event)
  );

  return (
    <GameContext.Provider
      value={{
        points,
        tip,
        secretWord,
        numErrors,
        chosenLetters,
        level,
        setLevel,
        checkLetter,
        restart,
        isPlaying,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
