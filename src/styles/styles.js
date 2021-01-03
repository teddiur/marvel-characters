import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html, body, #root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: 'Mukta', sans-serif;
  color: white;
  font-size: 10px;
  @media (min-width: 375px) {
    font-size: calc(10px + (4 * ((100vw - 375px) / 1225)));
  }
  @media (min-width: 1500px) {
    font-size: 14px;
  }
}`;
export { GlobalStyle };
