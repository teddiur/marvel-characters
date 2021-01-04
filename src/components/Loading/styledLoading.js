import styled, { keyframes } from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const wave = keyframes` 50%,
75% {
  transform: scale(2.5);
}
80%, 100% {
  opacity: 0;
}`;

const Dot = styled.div`
  position: relative;
  width: 1vmax;
  height: 1vmax;
  margin: 0.5em;
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

const BeatingContainer = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const beat = keyframes`
0%, 100% { 
    transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
  }
`;

const BeatingDot = styled.div`
  width: max(40px, 3vmax);
  height: max(40px, 3vmax);
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${beat} 2s infinite ease-in-out;
  animation-delay: ${(props) => props.delay};
`;

export { Dot, LoadingContainer, BeatingContainer, BeatingDot };
