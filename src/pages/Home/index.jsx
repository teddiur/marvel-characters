import * as P from '../';
import { useState } from 'react';

function Home({ specificCharacter, setSpecificCharacter }) {
  const [characters, setCharacters] = useState([]);

  return (
    <>
      {specificCharacter ? (
        <P.DetailedView specificCharacter={specificCharacter} />
      ) : (
        <P.GeneralView
          characters={characters}
          setCharacters={setCharacters}
          setSpecificCharacter={setSpecificCharacter}
        />
      )}
    </>
  );
}

export { Home };
