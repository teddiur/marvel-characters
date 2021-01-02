import { useState } from 'react';
import * as C from './components';
import * as P from './pages';
import * as S from './pages/generalView/styledPage';

function App() {
  const [characters, setCharacters] = useState([]);
  const [specificCharacter, setSpecificCharacter] = useState(null);

  return (
    <C.Layout setSpecificCharacter={setSpecificCharacter}>
      {specificCharacter ? (
        <P.DetailedView specificCharacter={specificCharacter} />
      ) : (
        <P.GeneralView
          characters={characters}
          setCharacters={setCharacters}
          setSpecificCharacter={setSpecificCharacter}
        />
      )}
      <S.FlexWrapper justify="center">
        <S.DisclaimerText>
          Data provided by Marvel. © 2020 MARVEL
        </S.DisclaimerText>
      </S.FlexWrapper>
    </C.Layout>
  );
}

export default App;
