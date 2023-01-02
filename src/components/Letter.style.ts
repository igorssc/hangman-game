import styled from "styled-components";
import type { LetterProps } from "./Letter";

export const LetterStyled = styled.span<LetterProps>`
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 1.5rem;
  border-radius: 4px;
  padding: 20px;
  display: block;
  text-align: center;
  background: ${(props) => {
    if (props.isActive) {
      return props.theme.colors.primary;
    }

    if (props.isWrong) {
      return "#c40d0d";
    }
    return props.theme.colors.secondary;
  }};
  color: ${(props) => (props.isActive ? "#242424" : "#fff")};
  animation: all 0.2s;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 1.3rem;
  }
`;
