import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 92%;
  padding: ${(props) => props.padding};
  justify-content: ${(props) => props.justify};
`;

const DisclaimerText = styled.a`
  color: white;
  bottom: '0';
  position: 'absolute';
  font-size: 1.2rem;
  text-decoration: none;
`;

export { FlexWrapper, DisclaimerText };
