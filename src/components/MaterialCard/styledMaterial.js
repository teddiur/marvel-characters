import styled from 'styled-components';

const Link = styled.a`
  width: max(15%, 200px);
  position: relative;
`;

const Tooltip = styled.figcaption`
  visibility: hidden;
  position: absolute;
  top: 0;
  background-color: black;
  color: #c93c4f;
  box-shadow: 1px 1px 5px white;
  z-index: 1;
  padding: 1px 2px;
  border-radius: 5px;
  text-align: center;
  transition: visibility 0.5s ease-in-out;
`;

const PortraitWrapper = styled.div`
  width: 100%;
  height: 100%;

  &:hover figcaption {
    visibility: visible;
  }
`;
export { Link, Tooltip, PortraitWrapper };
