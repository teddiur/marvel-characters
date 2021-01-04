import styled from 'styled-components';

const Link = styled.a`
  width: max(15%, 200px);
  position: relative;
`;

const Tooltip = styled.figcaption`
  visibility: hidden;
  position: absolute;
  /* top: 45%; */
  width: 100%;
  background-color: black;
  color: #ed1d24;
  /* box-shadow: 1px 1px 5px white; */
  z-index: 1;
  padding: 2px 2px;
  border-radius: 5px 5px 0 0;
  text-align: center;
  transition: visibility 0.5s ease-in-out;
  box-sizing: border-box;
`;

const PortraitWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  border: 1px solid #afafaf;
  /* padding: 1px; */

  &:hover figcaption {
    visibility: visible;
  }
`;
export { Link, Tooltip, PortraitWrapper };
