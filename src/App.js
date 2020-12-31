import { useState } from 'react';
import * as C from './components';
import * as P from './pages';

function App() {
  const [characters, setCharacters] = useState([]);
  const [specificCharacter, setSpecificCharacter] = useState(null);

  const data = {
    id: 1009165, //avengers
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/70/4c0035adc7d3a',
      extension: 'jpg',
    },
    name: 'Ajaxis',
    description: 'o mano é bolado',
  };
  console.log(specificCharacter);
  return (
    <C.Layout onClick={setSpecificCharacter}>
      {specificCharacter ? (
        <P.DetailedView data={data} speceficCharacter={specificCharacter} />
      ) : (
        <P.GeneralView
          characters={characters}
          setCharacters={setCharacters}
          setSpecificCharacter={setSpecificCharacter}
        />
      )}
      <p color="white">Data provided by Marvel. © 2020 MARVEL</p>
    </C.Layout>
  );
}

export default App;
