import useEvent from "@react-hook/event";
import { createContext, ReactNode, useEffect, useState } from "react";
import useSound from "use-sound";
import errorSound from "../assets/audios/error.mp3";
import gameOverSound from "../assets/audios/game-over.mp3";
import helpSound from "../assets/audios/help.mp3";
import moreThanTwoLettersSound from "../assets/audios/more-than-two-letters.mp3";
import oneLetterSound from "../assets/audios/one-letter.mp3";
import winnerSound from "../assets/audios/winner.mp3";
import { letters } from "../utils/alphabet";
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
  help: () => void;
  isPlaying: boolean;
  isUsedHelp: boolean;
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
  const [isUsedHelp, setIsUsedHelp] = useState(false);

  const [playSoundError] = useSound(errorSound);
  const [playSoundGameOver] = useSound(gameOverSound);
  const [playSoundWinner] = useSound(winnerSound);
  const [playSoundOneLetter] = useSound(oneLetterSound);
  const [playSoundMoreThanTwoLetters] = useSound(moreThanTwoLettersSound);
  const [playSoundHelp] = useSound(helpSound);

  const selectRandomWord = () => {
    const words = level === 1 ? easyWords : hardWords;

    const tipsAvailable = Object.keys(words);

    const randomWord = () => {
      const tipSelected =
        tipsAvailable[Math.floor(Math.random() * tipsAvailable.length)];

      setTip(tipSelected.charAt(0).toUpperCase() + tipSelected.slice(1));

      return (words as any)[tipSelected][
        Math.floor(Math.random() * (words as any)[tipSelected].length)
      ] as string;
    };

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
    if (letter.length > 1 || !removeSpecialCharacters(letter).match(/[A-Za-z]/))
      return;

    if (chosenLetters.includes(letter)) return;

    const secretWordFormated = removeSpecialCharacters(secretWord);

    const isCorrect = secretWordFormated.includes(letter.toUpperCase());

    const currentChosenLetters = [
      ...chosenLetters,
      removeSpecialCharacters(letter).toUpperCase(),
    ];

    if (!isCorrect) {
      setNumErrors((prev) => prev + 1);
      playSoundError();
    }

    setChosenLetters(currentChosenLetters);

    if (!isCorrect && numErrors === 5) {
      setIsPlaying(false);

      playSoundGameOver();
    } else {
      const isWinner = secretWordFormated.split("").reduce((prev, l) => {
        if (l !== " " && !currentChosenLetters.includes(l)) {
          return false;
        } else {
          return prev;
        }
      }, true);

      if (isWinner) {
        playSoundWinner();
        setIsPlaying(false);
      }

      const numberOfHits = secretWordFormated
        .split("")
        .filter((l) => l === letter);

      !isWinner &&
        numberOfHits.length > 0 &&
        numberOfHits.length < 3 &&
        playSoundOneLetter();
      !isWinner && numberOfHits.length > 2 && playSoundMoreThanTwoLetters();

      setPoints(
        (prev) =>
          prev + (level === 1 ? numberOfHits.length : numberOfHits.length * 2)
      );
    }
  };

  const help = () => {
    if (isUsedHelp) return;

    const secretWordLetters = [
      ...new Set(removeSpecialCharacters(secretWord).split("")),
    ];

    const lettersAvaiable = letters.filter((l) => !chosenLetters.includes(l));

    const wrongLetters = lettersAvaiable.filter(
      (l) => !secretWordLetters.includes(l)
    );

    const selectedLetters = [] as string[];

    const removedLetters =
      level === 1 ? Math.random() * (5 - 2) + 2 : Math.random() * (6 - 3) + 3;

    while (selectedLetters.length < removedLetters) {
      const temporaryLetter =
        wrongLetters[Math.floor(Math.random() * wrongLetters.length)];

      if (!selectedLetters.includes(temporaryLetter)) {
        selectedLetters.push(temporaryLetter);
      }
    }

    selectedLetters.forEach((l) => setChosenLetters((prev) => [...prev, l]));

    playSoundHelp();

    setIsUsedHelp(true);
  };

  useEffect(() => {
    setPoints(0);
    restart();
  }, [level]);

  const handleKeyDown = (event: globalThis.KeyboardEvent) => {
    checkLetter(event.key);
  };

  const restart = () => {
    if (!isPlaying) {
      if (numErrors > 5) {
        setPoints(0);
      }
    }

    setNumErrors(0);
    setChosenLetters([]);
    selectRandomWord();
    setIsPlaying(true);
    setIsUsedHelp(false);
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
        help,
        isUsedHelp,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
