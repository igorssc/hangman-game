import styled from "styled-components";

export const BackdropStyled = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100vw;
  height: 100vh;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background: #000;
    position: absolute;
    opacity: 0.9;
    z-index: -5;
  }
`;

export const Winner = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;

  h1 {
    font-family: low_budget;
    font-size: 86px;
    color: #eab308;
    text-align: center;
  }

  h2 {
    font-size: 22px;
    line-height: 44px;
    text-align: center;
    color: #fed7aa;
    margin-bottom: 130px;
  }

  @media (min-width: 768px) {
    .winner h1 {
      font-size: 192px !important;
    }

    .winner h2 {
      font-size: 48px !important;
    }
  }
`;

export const GameOver = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;

  h1 {
    font-family: low_budget;
    font-size: 48px;
    color: #eab308;
  }

  h2 {
    margin-bottom: 130px;
  }

  @media (min-width: 768px) {
    .game_over h1 {
      font-size: 96px !important;
    }
  }
`;
