import styled from "styled-components";

export const ContainerStyled = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 5px;

  @media (min-width: 350px) {
    padding: 0 10px;
  }

  @media (min-width: 768px) {
    padding: 20px;
  }
`;
