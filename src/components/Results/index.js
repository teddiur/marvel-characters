import React from 'react';
import * as S from './styledResults';

function Results() {
  const search = ['search', 'search4', 'search3', 'search2'];
  return (
    <S.ResultsContainer bottom={search.length * 5}>
      {search.map((item, index) => (
        <S.Result key={index}>{item}</S.Result>
      ))}
    </S.ResultsContainer>
  );
}

export { Results };
