import styled from "styled-components";
import type { ButtonProps } from "./Button";

export const ButtonStyled = styled.button<ButtonProps>`
  width: 100%;
  padding: 15px 0px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  margin: auto;
  width: 350px;
  max-width: 100%;
  border: none;
  color: ${(props) =>
    props.scheme === "primary"
      ? "#242424"
      : props.scheme === "secondary"
      ? "#fff"
      : "#242424"};
  background: ${(props) =>
    props.scheme === "primary"
      ? props.theme.colors.primary
      : props.scheme === "secondary"
      ? props.theme.colors.secondary
      : props.theme.colors.tertiary};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  filter: ${(props) => props.disabled && "brightness(0.5)"};

  ${(props) =>
    props.isDisabled &&
    "filter: brightness(0.5); :hover{filter: brightness(0.5);}"}

  @media (min-width: 768px) {
    padding: 25px 0px;
  }

  ${(props) =>
    props.small &&
    `
      width: 100%;
      padding: 15px 0px;
      
      @media (min-width: 768px) {
          padding: 15px 0px;
      }
  `}

  :hover {
    filter: ${(props) =>
      !props.disabled && !props.isDisabled && "brightness(0.9)"};
  }
`;
