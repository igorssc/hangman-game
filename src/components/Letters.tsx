import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { removeSpecialCharacters } from "../utils/format";
import { Letter } from "./Letter";
import { LettersStyled } from "./Letters.style";

export const Letters = () => {
  const { chosenLetters, checkLetter, secretWord } = useContext(GameContext);

  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return (
    <>
      <LettersStyled>
        {letters.map((letter, index) => (
          <Letter
            key={index}
            isActive={
              chosenLetters.includes(letter) &&
              removeSpecialCharacters(secretWord).includes(letter)
            }
            isWrong={
              chosenLetters.includes(letter) &&
              !removeSpecialCharacters(secretWord).includes(letter)
            }
            onClick={() => checkLetter(letter)}
          >
            {letter}
          </Letter>
        ))}
      </LettersStyled>
    </>
  );
};
