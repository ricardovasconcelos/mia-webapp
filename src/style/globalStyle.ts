import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
  overflow: hidden;
}

body {
  background: #f5f5f5;
  -webkit-font-smoothing: antialiased !important;
}

body,
input,
button {
  font-family: Arial, Helvetica, sans-serif;
}
`;

export default GlobalStyle