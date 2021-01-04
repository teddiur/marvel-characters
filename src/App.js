import { useState } from 'react';
import * as C from './components';
import * as P from './pages';
import * as S from './pages/generalView/styledPage';
import { GlobalStyle } from './styles';

function App() {
  const [specificCharacter, setSpecificCharacter] = useState(null);
  return (
    <C.Layout
      setSpecificCharacter={setSpecificCharacter}
      specificCharacter={specificCharacter}
    >
      <GlobalStyle />

      <P.Home
        specificCharacter={specificCharacter}
        setSpecificCharacter={setSpecificCharacter}
      />
      <S.FlexWrapper justify="center">
        <S.DisclaimerText href="https://www.marvel.com/">
          Data provided by Marvel. © 2020 MARVEL
        </S.DisclaimerText>
      </S.FlexWrapper>
    </C.Layout>
  );
}

export default App;
