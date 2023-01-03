import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { letters } from "../utils/alphabet";
import { removeSpecialCharacters } from "../utils/format";
import { Letter } from "./Letter";
import { LettersStyled } from "./Letters.style";

export const Letters = () => {
  const { chosenLetters, checkLetter, secretWord } = useContext(GameContext);

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
