import styled from 'styled-components';

const ResultsContainer = styled.div`
  width: clamp(15%, 200px, 25%);
  max-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  right: 0;
  top: clamp(40px, 8vh, 70px);
  z-index: 1;
  overflow-y: scroll;
`;

const Result = styled.div`
  background-color: #3d3e42;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid black;
  height: 45px;
  width: 100%;
`;

const Text = styled.p`
  padding: 0 0 0 5%;
  color: #97989c;
`;
export { ResultsContainer, Result, Text };
