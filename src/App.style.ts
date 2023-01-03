import styled from "styled-components";

export const ButtonsFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 70px 0 20px;

  @media (max-width: 768px) {
    > .restart {
      grid-column-end: span 2;
    }
    > .help {
      grid-column-end: span 2;
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-bottom: 40px;
    gap: 30px;
  }
`;
