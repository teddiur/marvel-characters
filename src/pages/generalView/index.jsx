import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../../services/api';
import getMd5 from '../../services/md5';
import { removeDuplicates } from '../../services/generalFunctions';
import * as C from '../../components';
import * as S from './styledPage';

const GeneralView = (props) => {
  const { characters, setCharacters, setSpecificCharacter } = props;
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
    const { ts, md5Hash } = getMd5();

    await api
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
      })
      .catch((err) => console.log('ERROR:', err));
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
                  onClick={() => {
                    console.log('oi', index);
                    setSpecificCharacter(character);
                  }}
                  ref={lastLoadedChar}
                  key={index}
                  data={character}
                ></C.CharacterCard>
              );
            } else {
              return (
                <C.CharacterCard
                  onClick={() => setSpecificCharacter(character)}
                  key={index}
                  data={character}
                ></C.CharacterCard>
              );
            }
          })}
          {loading && <div>carregando</div>}
        </S.FlexWrapper>
      )}
    </>
  );
};

export { GeneralView };
