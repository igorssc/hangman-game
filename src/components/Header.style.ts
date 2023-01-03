import styled from "styled-components";

export const Title = styled.h1`
  font-family: low_budget;
  font-size: 42px;
  line-height: 60px;
  text-align: center;
  margin-top: 20px;

  span {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (min-width: 768px) {
    line-height: 50px;
    font-size: 92px !important;
    margin-top: 70px;
  }
`;

export const Details = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
