import { HTMLAttributes } from "react";
import { LetterStyled } from "./Letter.style";

export interface LetterProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  isActive?: boolean;
  isWrong?: boolean;
}

export const Letter = ({
  children,
  isActive = false,
  isWrong = false,
  ...props
}: LetterProps) => {
  return (
    <>
      <LetterStyled isActive={isActive} isWrong={isWrong} {...props}>
        {children}
      </LetterStyled>
    </>
  );
};
