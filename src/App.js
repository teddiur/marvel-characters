import axios from 'axios';
import md5 from 'js-md5';
import { useState } from 'react';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

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
    .then((resp) => {
      setLoading(false);
      setCharacters(resp.data.data.results);
    })
    .catch((err) => console.log('FUDEU', err));
  return characters;
}
function App() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  getCharacters(setLoading, setCharacters);
  console.log(characters);
  return (
    <div className="App">
      {loading ? (
        <div>carregando</div>
      ) : (
        <div>carregou</div>
        // characters.map((char) => {
        //   return <div>{char.name}</div>;
      )}
    </div>
  );
}

export default App;
