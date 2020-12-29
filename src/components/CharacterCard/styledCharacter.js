import styled from 'styled-components';

const CardImage = styled.div`
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 50%;
  height: 30vh;
  position: relative;
  cursor: pointer;
  @media (max-width: 650px) {
    width: 100%;
  }
`;

const NameBox = styled.div`
  width: 30%;
  padding: min(5px, 1%) min(5px, 1%);
  clip-path: polygon(5% 0%, 0% 100%, 95% 100%, 100% 0%);
  background: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  bottom: min(20px, 5%);
  left: min(20px, 5%);
  text-align: center;
`;

export { CardImage, NameBox };
