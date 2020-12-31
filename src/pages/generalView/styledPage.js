import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 92%;
  padding: ${(props) => props.padding};
  justify-content: flex-start;
`;

export { FlexWrapper };
