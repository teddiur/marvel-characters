import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../../services/api';
// import getMd5 from '../../services/md5';
import { removeDuplicates } from '../../services/generalFunctions';
import * as C from '../../components';
import * as S from './styledPage';

const GeneralView = (props) => {
  const { characters, setCharacters, setSpecificCharacter } = props;
  const [loading, setLoading] = useState(true);
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

  const makeRequest = async (offset) => {
    const beforeQ = 'characters';

    const response = await api(offset, beforeQ, '');
    const { results, total } = response.data.data;
    const theresMore = characters.length < total;

    setLoading(false);
    setCharacters((prevChars) => {
      return removeDuplicates([...prevChars, ...results], 'id');
    });

    setHasMore(theresMore);
  };

  useEffect(() => {
    setLoading(true);
    makeRequest(offset);
  }, [offset]); // eslint-disable-line

  return (
    <>
      {characters && (
        <S.FlexWrapper justify="flex-start">
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
        </S.FlexWrapper>
      )}
      {loading && (
        <S.FlexWrapper justify="center" width="100%" padding="5% 0 0 0">
          <C.Loading />
        </S.FlexWrapper>
      )}
    </>
  );
};

export { GeneralView };
