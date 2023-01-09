import { ButtonHTMLAttributes } from "react";
import { ButtonStyled } from "./Button.style";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: "primary" | "secondary";
  small?: boolean;
  isDisabled?: boolean;
}

export const Button = ({
  scheme = "primary",
  small = false,
  ...props
}: ButtonProps) => {
  return (
    <>
      <ButtonStyled {...props} scheme={scheme} small={small} />
    </>
  );
};
