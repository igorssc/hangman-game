import styled from "styled-components";
import type { ButtonProps } from "./Button";

export const ButtonStyled = styled.button<ButtonProps>`
  padding: 15px 80px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  display: block;
  margin: auto;
  width: 350px;
  max-width: 100%;
  border: none;
  color: ${(props) => (props.scheme === "primary" ? "#242424" : "#fff")};
  background: ${(props) =>
    props.scheme === "primary"
      ? props.theme.colors.primary
      : props.theme.colors.secondary};

  @media (min-width: 768px) {
    padding: 25px 80px;
  }

  ${(props) =>
    props.small &&
    `
      width: 100%;
      padding: 15px 0px;
      
      @media (min-width: 768px) {
          padding: 15px 80px;
      }
  `}

  :hover {
    filter: brightness(0.9);
  }
`;
