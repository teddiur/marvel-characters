import { useState, useEffect } from 'react';
import md5 from 'js-md5';
import { api } from '../../services/api';
import * as C from '../../components';
import * as S from './styledPage';

const GeneralView = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

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
  return (
    <>
      {loading && <div>carregando</div>}
      {characters && (
        <S.FlexWrapper>
          {characters.map((character, index) => (
            <C.CharacterCard key={index} data={character}></C.CharacterCard>
          ))}
        </S.FlexWrapper>
      )}
    </>
  );
};
function removeDuplicates(arr, prop) {
  const propValues = arr.map((item) => item[prop]);
  const uniques = arr.filter(
    (element, index) => propValues.indexOf(element[prop]) === index,
  );
  return uniques;
}
export { GeneralView };
