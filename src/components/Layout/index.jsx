import { useState } from 'react';
import { MarvelLogo } from '../../assets/index';
import * as S from './styledLayout';
import * as C from '../';

const Layout = ({ setSpecificCharacter, children }) => {
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState('');

  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo
          onClick={() => setSpecificCharacter(null)}
          src={MarvelLogo}
          alt="Logo Marvel"
        />
        <C.Searchbar query={query} setQuery={setQuery} setOffset={setOffset} />
      </S.Header>
      <C.Results
        query={query}
        offset={offset}
        setOffset={setOffset}
        setSpecificCharacter={setSpecificCharacter}
      />
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
};

export { Layout };
