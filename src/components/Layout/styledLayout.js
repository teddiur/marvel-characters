import styled from 'styled-components';

const Header = styled.header`
  height: clamp(40px, 8vh, 70px);
  width: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Logo = styled.img`
  height: 85%;
  width: auto;
  cursor: pointer;
`;

const Main = styled.main`
  min-height: 100%;
  width: 100%;
  background-image: linear-gradient(0deg, #090e12, #16212a);
  padding: 0 0 2% 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
`;

const Searchbar = styled.div`
  max-width: 25%;
  box-sizing: border-box;
  position: absolute;
  right: 2%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    position: absolute;
    width: 20px;
    stroke: #802733;
    right: 0;
    cursor: pointer;
  }
  input:focus + svg {
    left: 0;
  }

  input {
    background-color: transparent;
    border: none;
    height: 50%;
    width: 100%;
    padding: 0 25px;
    color: #a8a8a8;
    caret-color: #802733;

    &:focus {
      outline: none;
    }
  }
`;
export { Header, Logo, Main, Wrapper, Searchbar };
