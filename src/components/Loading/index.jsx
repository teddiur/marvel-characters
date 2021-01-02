import React from 'react';
import * as S from './styledLoading';

function Loading() {
  const colors = ['#800000', '#ba0f0f', '#b44646', '#ff7e7e', '#ff7e7e'];
  return (
    <S.LoadingContainer>
      {colors.map((color, index) => (
        <S.Dot key={index} color={color} delay={(index + 1) * 0.2} />
      ))}
    </S.LoadingContainer>
  );
}

export { Loading };
