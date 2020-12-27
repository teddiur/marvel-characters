import axios from 'axios';
import md5 from 'js-md5';
import { useState, useEffect } from 'react';
import * as C from './components';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

function App() {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  async function getCharacters(setLoading, setCharacters) {
    const ts = new Date().getTime();
    const md5Hash = md5.create();
    md5Hash.update(
      ts +
        process.env.REACT_APP_MARVEL_PRIVATE_KEY +
        process.env.REACT_APP_MARVEL_PUBLIC_KEY,
    );

    const characters = await api
      .get(
        `characters?ts=${ts}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${md5Hash}`,
      )
      .then((response) => {
        setLoading(false);
        setCharacters(...response);
      })
      .catch((err) => console.log('FUDEU', err));
    return characters;
  }

  useEffect(() => {
    getCharacters(setLoading, setCharacters);
    console.log(characters);
    return;
  }, []);

  const teste = {
    data: {
      results: [
        {
          id: 156234,
          name: 'senhor incrivel',
          comics: {
            avaible: 13,
            items: [
              { resourceURI: 'uma uri', name: 'aventuras do sr incrivel' },
            ],
          },
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73',
            extension: 'jpg',
          },
        },
      ],
    },
  };

  return (
    <C.Layout>
      {loading ? (
        <div>carregando</div>
      ) : (
        <C.CharacterCard data={teste.data.results[0]}></C.CharacterCard>
        // characters.map((char) => {
        //   return <div>{char.name}</div>;
      )}
    </C.Layout>
  );
}

export default App;
