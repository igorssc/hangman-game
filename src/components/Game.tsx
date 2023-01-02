import { GameArea } from "./Game.style";
import { HangmanAnimation } from "./HangmanAnimation";
import { SecretWord } from "./SecretWord";

export const Game = () => {
  return (
    <>
      <GameArea id="game-area">
        <HangmanAnimation />
        <SecretWord />
      </GameArea>
    </>
  );
};
