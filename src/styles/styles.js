import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Mukta&display=swap');
html, body, #root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: 'Mukta', sans-serif;
}`;
export { GlobalStyle };
