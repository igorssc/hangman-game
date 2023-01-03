import { GameArea } from "./Game.style";
import { HangmanAnimation } from "./HangmanAnimation";
import { SecretWord } from "./SecretWord";

export const Game = () => {
  return (
    <>
      <GameArea>
        <HangmanAnimation />
        <SecretWord />
      </GameArea>
    </>
  );
};
