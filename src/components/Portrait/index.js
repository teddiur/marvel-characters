import styled from 'styled-components';

const Portrait = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  object-fit: ${(props) => props.fit};
  display: ${(props) => props.display};
`;

export { Portrait };
