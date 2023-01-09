import { SpeakerHigh, SpeakerSlash } from "phosphor-react";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Details, Title } from "./Header.style";

export const Header = () => {
  const { points, tip, isSound, setIsSound } = useContext(GameContext);

  return (
    <>
      <Title>
        Jogo <span>da</span> Forca
      </Title>
      <Details>
        <p>Dica: {tip}</p>
        <p>
          Sua pontuação: {points.toLocaleString("pt-BR")}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          {isSound && (
            <SpeakerHigh
              color="#ffffff"
              size={25}
              weight="bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsSound(false);
                localStorage.setItem("s", String(false));
              }}
            />
          )}
          {!isSound && (
            <SpeakerSlash
              color="#b40404"
              size={25}
              weight="bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsSound(true);
                localStorage.setItem("s", String(true));
              }}
            />
          )}
        </p>
      </Details>
    </>
  );
};
