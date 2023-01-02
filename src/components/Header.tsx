import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Details, Title } from "./Header.style";

export const Header = () => {
  const { points, tip } = useContext(GameContext);

  return (
    <>
      <Title>
        Jogo <span>da</span> Forca
      </Title>
      <Details>
        <p>Dica: {tip}</p>
        <p>Sua pontuação: {points}</p>
      </Details>
    </>
  );
};
