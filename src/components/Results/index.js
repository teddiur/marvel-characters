import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import { removeDuplicates } from '../../services/generalFunctions';
import * as S from './styledResults';
import * as C from '../../components/';

function Results(props) {
  const { query, offset, setOffset, setSpecificCharacter } = props;
  const cancel = useRef(() => {});
  const [material, setMaterial] = useState({ query: '', results: [] });

  async function makeRequest(offset, query) {
    const search = query ? `nameStartsWith=${query}&` : '';

    if (!search) return;
    const response = await api(offset, 'characters', search, cancel);
    if (response) {
      const { results, total } = response.data.data;

      return results;
    }
  }

  useEffect(() => {
    (async () => {
      const results = await makeRequest(offset, query);
      if (!query) setMaterial({ query: '', results: [] });
      if (!results) return;

      if (results.query === material.query) {
        setMaterial((previous) => {
          return {
            query,
            results: removeDuplicates([...previous, ...results], 'id'),
          };
        });
      } else {
        setMaterial({ query, results });
      }
    })();
    return () => cancel.current();
  }, [query, offset]); //eslint-disable-line

  return (
    <S.ResultsContainer>
      {material.results.map((item, index) => {
        const size = 'max(50px, 20%)';
        const src = item.thumbnail.path.includes('not_available')
          ? `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/landscape_small.jpg`
          : `${item.thumbnail.path}/standard_small.${item.thumbnail.extension}`;
        return (
          <S.Result
            height={size}
            key={index}
            onClick={() => setSpecificCharacter(item)}
          >
            <C.Portrait
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
  );
}

export { Results };
