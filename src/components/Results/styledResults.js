import styled from 'styled-components';

const ResultsContainer = styled.div`
  min-width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  right: 0;
  top: clamp(40px, 8vh, 70px);

  z-index: 1;
`;

const Result = styled.div`
  background-color: #3d3e42;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  color: white;
  border-top: 1px solid black;
  height: 5vh;
  width: 100%;
`;
export { ResultsContainer, Result };
