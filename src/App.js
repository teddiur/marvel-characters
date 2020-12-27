import axios from 'axios';
import md5 from 'js-md5';
import { useState, useEffect } from 'react';
import * as C from './components';
import styled from 'styled-components';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: flex-start;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  async function getCharacters() {
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
        setCharacters((prevChars) => {
          return removeDuplicates(
            [...prevChars, ...response.data.data.results],
            'id',
          );
        });
      })
      .catch((err) => console.log('ERROR:', err));
    return characters;
  }

  useEffect(() => {
    getCharacters();
    return;
  }, []);

  console.log('chars', characters);
  return (
    <C.Layout>
      {loading && <div>carregando</div>}
      {characters && (
        <FlexWrapper>
          {characters.map((character, index) => (
            <C.CharacterCard key={index} data={character}></C.CharacterCard>
          ))}
        </FlexWrapper>
      )}
    </C.Layout>
  );
}

function removeDuplicates(arr, prop) {
  const propValues = arr.map((item) => item[prop]);
  const uniques = arr.filter(
    (element, index) => propValues.indexOf(element[prop]) === index,
  );
  return uniques;
}
export default App;
