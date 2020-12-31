import { useState } from 'react';
import * as C from './components';
import * as P from './pages';

function App() {
  const [characters, setCharacters] = useState([]);
  const [specificCharacter, setSpecificCharacter] = useState(null);

  return (
    <C.Layout onClick={setSpecificCharacter}>
      {specificCharacter ? (
        <P.DetailedView speceficCharacter={specificCharacter} />
      ) : (
        <P.GeneralView
          characters={characters}
          setCharacters={setCharacters}
          setSpecificCharacter={setSpecificCharacter}
        />
      )}
      <p
        style={{
          color: 'white',
          right: 'auto',
          left: 'auto',
          bottom: '0',
          position: 'absolute',
        }}
      >
        Data provided by Marvel. © 2020 MARVEL
      </p>
    </C.Layout>
  );
}

export default App;
