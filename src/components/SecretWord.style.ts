import styled from "styled-components";

interface SecretWordStyledProps {
  word: string;
}

export const SecretWordStyled = styled.div<SecretWordStyledProps>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.word?.length}, 1fr)`};

  > div {
    display: flex;
    flex-direction: column;
    justify-items: baseline;
    justify-content: end;
    align-items: center;
    font-size: 3rem;
    padding: 10px;

    span {
      margin-top: 20px;
      width: 100%;
      border-bottom: 6px solid #fff;
    }
  }
`;
