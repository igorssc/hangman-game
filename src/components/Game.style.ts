import styled from "styled-components";

export const GameArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  position: relative;
  margin: auto;
  justify-items: center;
  align-items: center;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 70px;
  }
`;
