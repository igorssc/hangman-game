import { gql, useMutation, useQuery } from "@apollo/client";
import useEvent from "@react-hook/event";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useSound from "use-sound";
import errorSound from "../assets/audios/error.mp3";
import gameOverSound from "../assets/audios/game-over.mp3";
import helpSound from "../assets/audios/help.mp3";
import moreThanTwoLettersSound from "../assets/audios/more-than-two-letters.mp3";
import oneLetterSound from "../assets/audios/one-letter.mp3";
import winnerSound from "../assets/audios/winner.mp3";
import { getRecordsQueryResponse, GET_RECORDS } from "../db/getRecords";
import { letters } from "../utils/alphabet";
import { removeSpecialCharacters } from "../utils/format";
import { easyWords, hardWords } from "../utils/words";

interface GameProviderProps {
  children: ReactNode;
}

interface publishRecordMutationResponse {
  publishRecord: { id: string };
}

interface registerRecordMutationResponse {
  createRecord: { id: string };
}

type RestartType = {
  isTotal?: boolean;
};

type GameData = {
  points: number;
  tip: string;
  secretWord: string;
  numErrors: number;
  chosenLetters: string[];
  level: 1 | 2;
  setLevel: Dispatch<SetStateAction<1 | 2>>;
  checkLetter: (letter: string) => void;
  restart: (props: RestartType) => void;
  help: () => void;
  isPlaying: boolean;
  isUsedHelp: boolean;
  isRecord: boolean;
  records: undefined | getRecordsQueryResponse["records"];
  registerRecord: (name: string) => void;
  skipWord: () => void;
  checkRecord: () => boolean;
  isChangingLevels: boolean;
  setIsChangingLevels: Dispatch<SetStateAction<boolean>>;
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
  const [isRecord, setIsRecord] = useState(false);
  const [records, setRecords] = useState<
    undefined | getRecordsQueryResponse["records"]
  >(undefined);
  const [isChangingLevels, setIsChangingLevels] = useState(false);

  const [playSoundError] = useSound(errorSound);
  const [playSoundGameOver] = useSound(gameOverSound);
  const [playSoundWinner] = useSound(winnerSound);
  const [playSoundOneLetter] = useSound(oneLetterSound);
  const [playSoundMoreThanTwoLetters] = useSound(moreThanTwoLettersSound);
  const [playSoundHelp] = useSound(helpSound);

  const [avaiableWords, setAvaiableWords] = useState<string[]>([]);
  const [wordsAlreadySelected, setWordsAlreadySelected] = useState<string[]>(
    []
  );

  const { data: dataGetRecords, refetch: refetchGetRecords } =
    useQuery<getRecordsQueryResponse>(GET_RECORDS, {
      variables: {
        level,
      },
    });

  const onInitAvaiableWords = () => {
    const words = level === 1 ? easyWords : hardWords;

    const tipsAvailable = Object.keys(words);

    let avaiableCurrentWords = [] as string[];

    tipsAvailable.forEach((v) => {
      avaiableCurrentWords = [...avaiableCurrentWords, ...(words as any)[v]];
    });

    setAvaiableWords(avaiableCurrentWords);
  };

  useEffect(() => {
    onInitAvaiableWords();
  }, []);

  useEffect(() => {
    wordsAlreadySelected.length > 0 &&
      wordsAlreadySelected.length === avaiableWords.length &&
      setWordsAlreadySelected([]);
  }, [setWordsAlreadySelected]);

  useEffect(() => {
    onInitAvaiableWords();
    restart({ isTotal: true });
  }, [level]);

  useEffect(() => {
    const pointsSave = localStorage.getItem("p");

    if (pointsSave) {
      setPoints(+pointsSave);
    }
  }, []);

  useEffect(() => {
    refetchGetRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetchGetRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    setRecords(dataGetRecords?.records);
  }, [dataGetRecords]);

  const REGISTER_RECORD = gql`
    mutation RegisterRecord($name: String!, $score: Int!, $level: Int!) {
      createRecord(data: { name: $name, score: $score, level: $level }) {
        id
      }
    }
  `;

  const PUBLISH_RECORD = gql`
    mutation PublishRecord($id: ID!) {
      publishRecord(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `;

  const [registerRecordMutateFunction] =
    useMutation<registerRecordMutationResponse>(REGISTER_RECORD);

  const [publishRecordMutateFunction] =
    useMutation<publishRecordMutationResponse>(PUBLISH_RECORD);

  const selectRandomWord = () => {
    const words = level === 1 ? easyWords : hardWords;

    console.log("level", level);

    const tipsAvailable = Object.keys(words);

    const randomWord = () => {
      const tipSelected =
        tipsAvailable[Math.floor(Math.random() * tipsAvailable.length)];

      setTip(
        tipSelected.charAt(0).toUpperCase() + tipSelected.slice(1).toLowerCase()
      );

      return (words as any)[tipSelected][
        Math.floor(Math.random() * (words as any)[tipSelected].length)
      ] as string;
    };

    let wordSelected = randomWord().toUpperCase() as string;

    while (wordsAlreadySelected.includes(wordSelected)) {
      wordSelected = randomWord().toUpperCase();
    }

    setWordsAlreadySelected((prev) => [...prev, wordSelected.toUpperCase()]);
    setSecretWord(wordSelected.toUpperCase());
  };

  useEffect(() => {
    selectRandomWord();
  }, []);

  const checkRecord = () => {
    let isRecord = false;

    if ((!records || (records && records.length < 10)) && points > 0) {
      isRecord = true;
    }

    if (!isRecord) {
      records?.forEach((record) => {
        record.score < points && (isRecord = true);
      });
    }

    setIsRecord(isRecord);

    return isRecord;
  };

  const registerRecord = async (name: string) => {
    try {
      await registerRecordMutateFunction({
        variables: { name, score: points, level },
      }).then(async ({ data }) => {
        await publishRecordMutateFunction({
          variables: {
            id: (data as registerRecordMutationResponse).createRecord.id,
          },
        }).then(() => {
          refetchGetRecords();
        });
      });
    } catch {
    } finally {
      restart({});
    }
  };

  const checkLetter = (letter: string) => {
    if (!isPlaying || isChangingLevels) return;

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

    const numberOfHits = secretWordFormated
      .split("")
      .filter((l) => l === letter);

    setPoints(
      (prev) =>
        prev + (level === 1 ? numberOfHits.length : numberOfHits.length * 2)
    );

    if (!isCorrect && numErrors === 5) {
      setIsPlaying(false);
      checkRecord();
      playSoundGameOver();
      localStorage.setItem("p", "0");
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
        const pointsSave = points + 10 + 1;
        localStorage.setItem("p", String(pointsSave));

        let wonUndefeated = true;

        currentChosenLetters.forEach((l) => {
          if (!secretWordFormated.includes(l.toUpperCase())) {
            wonUndefeated = false;
          }
        });

        let newPointsBonus = level === 1 ? 10 : 20;

        if (wonUndefeated) {
          newPointsBonus += level === 1 ? 20 : 30;
        }

        setPoints((prev) => prev + newPointsBonus);
      }

      !isWinner &&
        numberOfHits.length > 0 &&
        numberOfHits.length < 3 &&
        playSoundOneLetter();
      !isWinner && numberOfHits.length > 2 && playSoundMoreThanTwoLetters();
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

  const handleKeyDown = (event: globalThis.KeyboardEvent) => {
    checkLetter(event.key);
  };

  const skipWord = () => {
    if (points < 200) return;

    setPoints((prev) => prev - 200);

    restart({});
  };

  const restart = ({ isTotal = false }: RestartType) => {
    if (isTotal) {
      setPoints(0);
      localStorage.setItem("p", "0");
    }

    if (!isPlaying) {
      if (numErrors > 5) {
        setPoints(0);
        localStorage.setItem("p", "0");
      }
      setIsRecord(false);
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
        isRecord,
        records,
        registerRecord,
        skipWord,
        checkRecord,
        isChangingLevels,
        setIsChangingLevels,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
