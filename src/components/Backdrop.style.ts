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
  width: 100%;
  height: 100%;

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
    margin-bottom: 70px;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 56px;
    }

    h2 {
      font-size: 1.4rem;
      line-height: 2rem;
      word-wrap: break-word;
    }

    width: calc(100% - 30px);
    margin: auto;
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
  position: relative;

  h1 {
    font-family: low_budget;
    font-size: 48px;
    color: #eab308;
    word-wrap: break-word;
  }

  h2 {
    margin-bottom: 70px;
    font-size: 1.3rem;
    line-height: 2.5rem;
    word-wrap: break-word;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 32px;
      line-height: 50px;
    }

    h2 {
      font-size: 1rem;
      line-height: 2rem;
      word-wrap: break-word;
    }

    width: calc(100% - 30px);
    margin: auto;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 96px !important;
    }
  }
`;

export const RecordStyled = styled.div`
  width: 100%;
  margin-top: -100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  display: block;

  h3 {
    color: #eab308;
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  input {
    width: calc(100% - 10px);
    height: 40px;
    padding: 5px;
    margin-top: 15px;
    margin-bottom: 50px;
    border: none;
    font-size: 1rem;
  }

  @media (max-width: 500px) {
    h3 {
      font-size: 1.3rem;
      line-height: 2rem;
      word-wrap: break-word;
    }

    h4 {
      font-size: 1rem;
      line-height: 2rem;
      word-wrap: break-word;
    }
  }
`;
