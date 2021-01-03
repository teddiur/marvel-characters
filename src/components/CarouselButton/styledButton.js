import styled from 'styled-components';

const Circle = styled.button`
  position: absolute;
  ${(props) => props.position};
  border-radius: 50%;
  background-color: #57616a;
  height: 2rem;
  width: 2rem;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    background-color: #ced1d7;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonText = styled.p`
  color: #090e12;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 0%;
  margin-block-start: 0%;
`;

export { Circle, ButtonText };
