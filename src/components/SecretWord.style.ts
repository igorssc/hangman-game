import styled from "styled-components";

interface SecretWordStyledProps {
  word: string;
}

export const SecretWordStyled = styled.div<SecretWordStyledProps>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.word?.length > 8 ? 8 : props.word?.length}, 1fr)`};

  > div {
    display: flex;
    flex-direction: column;
    justify-items: baseline;
    justify-content: end;
    align-items: center;
    font-size: 2rem;
    padding: 10px;
    min-height: 60px;
    min-width: 20px;
    flex-wrap: wrap;

    span {
      margin-top: 20px;
      width: 100%;
      max-width: 90px;
      border-bottom: 6px solid #fff;
    }
  }

  > div.space {
    span {
      border-bottom: 6px solid transparent;
    }
  }

  @media (max-width: 768px) {
    > div {
      font-size: 1rem;
      min-height: 30px;

      span {
        margin-top: 8px;
        max-width: 50px;
        border-width: 3px;
      }
    }
  }
`;
