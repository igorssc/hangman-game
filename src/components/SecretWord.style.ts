import styled from "styled-components";

interface SecretWordStyledProps {
  word: string;
  biggestWord: number;
}

export const SecretWordStyled = styled.div<SecretWordStyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    font-size: 2rem;
    padding: 10px;
    flex-wrap: wrap;
    gap: 15px;

    > div {
      width: calc(100% / ${(props) => props.biggestWord} - 15px);
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: center;
      line-height: 30px;
    }

    span:nth-child(1) {
      height: 30px;
    }

    span:nth-child(2) {
      margin-top: 20px;
      width: 100%;
      border-bottom: 4px solid #fff;
    }
  }

  @media (max-width: 768px) {
    > div {
      font-size: 1rem;
      min-height: 30px;
      gap: 10px;

      > div {
        width: calc(100% / ${(props) => props.biggestWord} - 10px);
      }

      span:nth-child(2) {
        margin-top: 8px;
        border-width: 2px;
      }
    }
  }
`;
