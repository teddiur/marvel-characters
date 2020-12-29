import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
`;
const SubTitle = styled.h2`
  color: #802733;
  font-size: 2rem;
  text-transform: uppercase;
  margin-top: 1rem;
  margin-bottom: 0;
  margin-block-end: 0;
  margin-block-start: 0;
`;

const Text = styled.p`
  color: #fff;
  font-size: 1.5rem;
  margin-block-end: 0;
  margin-block-start: 0;
`;

export { FlexWrapper, SubTitle, Text };
