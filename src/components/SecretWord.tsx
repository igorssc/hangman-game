import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { removeSpecialCharacters } from "../utils/format";
import { SecretWordStyled } from "./SecretWord.style";

export const SecretWord = () => {
  const { secretWord, chosenLetters } = useContext(GameContext);

  return (
    <>
      <SecretWordStyled word={secretWord}>
        {secretWord.split("").map((letter, index) => (
          <div key={index} className={letter === " " ? "space" : ""}>
            {letter === " " && "-"}
            {letter !== " " &&
              chosenLetters.includes(removeSpecialCharacters(letter)) &&
              letter.toUpperCase()}
            <span />
          </div>
        ))}
      </SecretWordStyled>
    </>
  );
};
