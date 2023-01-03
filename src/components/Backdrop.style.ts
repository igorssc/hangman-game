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

  .record {
    width: 100%;
    margin-top: -100px;
    margin-bottom: 90px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;

    h3 {
      color: #eab308;
    }

    > div {
      width: 100%;
      position: relative;
    }

    button {
      width: 100px;
      height: 50px;
      border-radius: 0 4px 4px 0;
      border: none;
      position: relative;
      top: 1px;
      background: ${(props) => props.theme.colors.secondary};
      cursor: pointer;
    }

    button > span {
      filter: brightness(2.98) contrast(0.23) saturate(3) sepia(0.95);
    }

    input {
      height: 40px;
      padding: 5px;
      border-radius: 4px 0 0 4px;
      border: none;
      width: calc(100% - 110px);
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .record {
      button {
        width: 60px;
      }

      input {
        width: calc(100% - 70px);
      }
    }
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 96px !important;
    }
  }
`;
