import styled from 'styled-components';

const Searchbar = styled.div`
  width: clamp(12%, 200px, 22%);
  box-sizing: border-box;
  position: absolute;
  right: 2%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img:first-child {
    position: absolute;
    width: 20px;
    right: ${(props) => props.searchRight};
    transition: right 0.15s ease;
    cursor: pointer;
  }
`;
const CloseIcon = styled.img`
  width: 2vw;
  cursor: pointer;
`;
const InputSearch = styled.input`
  background-color: transparent;
  border: none;
  height: 50%;
  width: 100%;
  margin: 0 0 0 5%;
  color: #a8a8a8;
  caret-color: #802733;

  &:focus {
    outline: none;
    border-bottom: 1px solid #802733;
  }
`;
export { Searchbar, InputSearch, CloseIcon };
