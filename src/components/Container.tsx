import { ReactNode } from "react";
import { ContainerStyled } from "./Container.style";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <ContainerStyled>{children}</ContainerStyled>
    </>
  );
};
