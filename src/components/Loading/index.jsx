import React from 'react';
import * as S from './styledLoading';

function Loading() {
  const colors = ['#7ef9ff', '#89cff0', '#4682b4', '#0f52ba', '#000080'];
  return (
    <S.LoadingContainer>
      {colors.map((color, index) => (
        <S.Dot key={index} color={color} delay={(index + 1) * 0.2} />
      ))}
    </S.LoadingContainer>
  );
}

export { Loading };
