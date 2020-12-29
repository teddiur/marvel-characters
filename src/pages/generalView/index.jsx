import { useState, useEffect, useCallback, useRef } from 'react';
import md5 from 'js-md5';
import { api } from '../../services/api';
import * as C from '../../components';
import * as S from './styledPage';

const GeneralView = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastLoadedChar = useCallback(
    (node) => {
      if (loading) return; //if it's loading i don't want to change the observer yet
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore) {
            setOffset((previous) => previous + 20);
          }
        },
        { threshold: 0.9 },
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const getCharacters = async (offset) => {
    const ts = new Date().getTime();
    const md5Hash = md5.create();
    md5Hash.update(
      ts +
        process.env.REACT_APP_MARVEL_PRIVATE_KEY +
        process.env.REACT_APP_MARVEL_PUBLIC_KEY,
    );

    const chars = await api
      .get(
        `characters?offset=${offset}&ts=${ts}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${md5Hash}`,
      )
      .then((response) => {
        const { results, total } = response.data.data;
        const theresMore = characters.length < total;
        setLoading(false);
        setCharacters((prevChars) => {
          return removeDuplicates([...prevChars, ...results], 'id');
        });

        setHasMore(theresMore);
        console.log(characters);
      })
      .catch((err) => console.log('ERROR:', err));
    return chars;
  };

  useEffect(() => {
    setLoading(true);
    getCharacters(offset);
  }, [offset]); // eslint-disable-line

  return (
    <>
      {characters && (
        <S.FlexWrapper>
          {characters.map((character, index) => {
            if (characters.length === index + 1) {
              return (
                <C.CharacterCard
                  ref={lastLoadedChar}
                  key={index}
                  data={character}
                ></C.CharacterCard>
              );
            } else {
              return (
                <C.CharacterCard key={index} data={character}></C.CharacterCard>
              );
            }
          })}
          {loading && <div>carregando</div>}
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
