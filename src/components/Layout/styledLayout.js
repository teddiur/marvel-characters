import styled from 'styled-components';

const Header = styled.header`
  height: 8%;
  width: 100%;
  min-height: 40px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 85%;
  width: auto;
`;

const Main = styled.main`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(0deg, #090e12, #16212a);
`;
export { Header, Logo, Main };