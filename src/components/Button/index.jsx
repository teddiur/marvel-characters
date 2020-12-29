import React from 'react';
import * as S from './styledButton';

const position = {
  less: 'left: -3rem',
  more: 'right: -3rem',
};
export function CarouselButton({ children, action, onClick }) {
  const change = action === 'less' ? Number(-1) : Number(+1);

  return (
    <S.Circle
      onClick={() => {
        onClick((previous) => previous + change);
      }}
      position={position[action]}
    >
      <S.ButtonText>{children}</S.ButtonText>
    </S.Circle>
  );
}
