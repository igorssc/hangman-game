import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { removeSpecialCharacters } from "../utils/format";
import { SecretWordStyled } from "./SecretWord.style";

export const SecretWord = () => {
  const { secretWord, chosenLetters } = useContext(GameContext);

  const biggestWord = () => {
    let size = 0;

    secretWord
      .split(" ")
      .forEach((word) => word.length > size && (size = word.length));

    return size;
  };

  return (
    <>
      <SecretWordStyled word={secretWord} biggestWord={biggestWord()}>
        {secretWord.split(" ").map((word, index) => (
          <div key={index}>
            {word.split("").map((letter, i) => {
              if (letter !== "")
                return (
                  <div key={i}>
                    <span>
                      {letter &&
                        chosenLetters.includes(
                          removeSpecialCharacters(letter)
                        ) &&
                        letter.toUpperCase()}
                    </span>
                    <span />
                  </div>
                );
            })}
          </div>
        ))}
      </SecretWordStyled>
    </>
  );
};
