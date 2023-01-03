import styled from "styled-components";

export const RecordStyled = styled.table`
  width: 100%;
  margin: auto;
  background: ${(props) => props.theme.colors.secondary};
  border-collapse: collapse;
  text-align: center;
  margin-bottom: 30px;

  tr {
    height: 50px;
  }

  thead > tr:first-child {
    height: 50px;
    background: ${(props) => props.theme.colors.primary};
    color: #242424;
  }

  tbody > tr:nth-child(even) {
    background: #4f4f4f;
  }

  th,
  td {
    padding: 0 15px;
  }

  @media (max-width: 768px) {
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }

    td {
      font-size: 0.8rem;
    }
  }
`;
