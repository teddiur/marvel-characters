import { useState } from 'react';
import { MarvelLogo } from '../../assets/index';
import * as S from './styledLayout';
import * as C from '../';

const Layout = ({ specificCharacter, setSpecificCharacter, children }) => {
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState('');
  const [resultsVisible, setResultsVisible] = useState(false);

  function handleLogoClick() {
    setSpecificCharacter(null);
    window.scrollTo(0, 0);
  }
  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo onClick={handleLogoClick} src={MarvelLogo} alt="Logo Marvel" />
        <C.Searchbar
          query={query}
          setQuery={setQuery}
          setOffset={setOffset}
          setResultsVisible={setResultsVisible}
          specificCharacter={specificCharacter}
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
