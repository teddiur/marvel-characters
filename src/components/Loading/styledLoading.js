import styled, { keyframes } from 'styled-components';

const wave = keyframes` 50%,
75% {
  transform: scale(2.5);
}
80%,
100% {
  opacity: 0;
}`;

const Dot = styled.div`
  position: relative;
  width: 2em;
  height: 2em;
  margin: 0.8em;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: ${wave} 2s ease-out infinite;
    animation-delay: ${(props) => props.delay}s;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  width: ${(props) => props.width || '100%'};
`;
export { Dot, LoadingContainer };
