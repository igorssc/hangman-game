import styled from "styled-components";

export const Title = styled.h1`
  font-family: low_budget;
  font-size: 48px;
  text-align: center;
  margin-top: 70px;

  span {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (min-width: 768px) {
    font-size: 92px !important;
  }
`;

export const Details = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;
