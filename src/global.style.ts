import { createGlobalStyle } from "styled-components";
import lowBudgetFont from "./fonts/low_budget.ttf";

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: low_budget;
  src: url(${lowBudgetFont});
}

:root{
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
  
`;
