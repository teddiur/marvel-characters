import styled from 'styled-components';

const ResultsContainer = styled.div`
  width: clamp(15%, 200px, 25%);
  min-width: 250px;
  max-height: 50vh;
  position: absolute;
  right: 0;
  top: clamp(40px, 8vh, 70px);
  z-index: 1;
  overflow-y: scroll;
  @media (max-width: 700px) {
    width: clamp(25%, 250px, 100%);
  }
`;

const Result = styled.div`
  height: ${(props) => props.height};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  background-color: #3d3e42;
  border-top: 1px solid black;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.p`
  padding: 0 0 0 5%;
  color: #97989c;
  margin-block-end: 0;
  margin-block-start: 0;
`;
export { ResultsContainer, Result, Text };
