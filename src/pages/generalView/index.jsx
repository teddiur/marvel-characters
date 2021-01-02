import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import useLastLoaded from '../../services/infiniteScroll';
import { removeDuplicates } from '../../services/generalFunctions';
import * as C from '../../components';
import * as S from './styledPage';

const GeneralView = (props) => {
  const { characters, setCharacters, setSpecificCharacter } = props;
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const cancel = useRef(() => {});

  const observer = useRef();

  const lastLoadedChar = useLastLoaded(loading, observer, setOffset, hasMore);

  const makeRequest = async (offset) => {
    const url = 'characters';

    const response = await api(offset, url, '', cancel);
    if (response) {
      const { results, total } = response.data.data;
      return { results, total };
    }
    return { results: [], total: 0 };
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { results, total } = await makeRequest(offset);
      setLoading(false);
      setCharacters((prevChars) => {
        return removeDuplicates([...prevChars, ...results], 'id');
      });

      const theresMore = characters.length < total;
      setHasMore(theresMore);
    })();

    const insideCancel = cancel.current; //eslint complains
    return () => insideCancel();
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
