import { useState } from 'react';
import { MarvelLogo } from '../../assets/index';
import * as S from './styledLayout';
import * as C from '../';

const Layout = ({ setSpecificCharacter, children }) => {
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState('');
  const [resultsVisible, setResultsVisible] = useState(false);

  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo
          onClick={() => setSpecificCharacter(null)}
          src={MarvelLogo}
          alt="Logo Marvel"
        />
        <C.Searchbar
          query={query}
          setQuery={setQuery}
          setOffset={setOffset}
          setResultsVisible={setResultsVisible}
        />
      </S.Header>
      <C.Results
        query={query}
        offset={offset}
        setOffset={setOffset}
        setSpecificCharacter={setSpecificCharacter}
        resultsVisible={resultsVisible}
      />
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
};

export { Layout };
