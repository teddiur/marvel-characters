import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import { removeDuplicates } from '../../services/generalFunctions';
import useLastLoaded from '../../services/infiniteScroll';
import * as S from './styledResults';
import * as C from '../../components/';

function Results({
  query,
  offset,
  setOffset,
  setSpecificCharacter,
  resultsVisible,
}) {
  const cancel = useRef(() => {});
  const [material, setMaterial] = useState({ query: '', results: [] });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastLoadedChar = useLastLoaded(loading, observer, setOffset, hasMore);

  async function makeRequest(offset, query) {
    const search = query ? `nameStartsWith=${query}&` : '';
    const noResponse = { results: [], total: 0 };

    if (!search) {
      return noResponse;
    }
    const response = await api(offset, 'characters', search, cancel);
    if (response) {
      const { results, total } = response.data.data;
      return { results, total };
    } else {
      return noResponse;
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { results, total } = await makeRequest(offset, query);
      setLoading(false);
      if (!query) setMaterial({ query: '', results: [] });
      if (!results) return;

      if (query === material.query) {
        setMaterial((previous) => {
          return {
            query,
            results: removeDuplicates([...previous.results, ...results], 'id'),
          };
        });
      } else {
        setMaterial({ query, results });
      }

      const theresMore = material.results.length < total;
      setHasMore(theresMore);
    })();
    const insideCancel = cancel.current; //eslint complains

    return () => insideCancel();
  }, [query, offset]); //eslint-disable-line

  return (
    <>
      {resultsVisible && (
        <S.ResultsContainer>
          {material.results.map((item, index) => {
            const size = '50px';
            const src = item.thumbnail.path.includes('not_available')
              ? `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/landscape_small.jpg`
              : `${item.thumbnail.path}/standard_small.${item.thumbnail.extension}`;
            const ref =
              index + 1 === material.results.length
                ? { ref: lastLoadedChar }
                : '';
            return (
              <S.Result
                height={size}
                key={index}
                onClick={() => {
                  setSpecificCharacter(item);
                }}
              >
                <C.Portrait
                  {...ref}
                  src={src}
                  height={size}
                  width={size}
                  fit="cover"
                ></C.Portrait>
                <S.Text>{item.name}</S.Text>
              </S.Result>
            );
          })}
        </S.ResultsContainer>
      )}{' '}
    </>
  );
}

export { Results };
