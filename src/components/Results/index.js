import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import { removeDuplicates } from '../../services/generalFunctions';
import * as S from './styledResults';
import * as C from '../../components/';

function Results(props) {
  const { query, offset, setOffset } = props;
  const cancel = useRef(() => {});
  const [material, setMaterial] = useState({ query: '', results: [] });

  async function makeRequest(offset, query) {
    const search = query ? `nameStartsWith=${query}&` : '';

    if (!search) return;
    const response = await api(offset, 'characters', search, cancel);
    const { results, total } = response.data.data;

    return results;
  }

  useEffect(() => {
    (async () => {
      const results = await makeRequest(offset, query);
      if (!results) return;
      if (results.query === material.query) {
        setMaterial((previous) => {
          return {
            query,
            results: removeDuplicates([...previous, ...results], 'id'),
          };
        });
      } else {
        console.log(results, 'i');
        setMaterial({ query, results });
      }
    })();
    return () => cancel.current();
  }, [query, offset]); //eslint-disable-line
  console.log(material.results, 'results');
  return (
    <S.ResultsContainer>
      {material.results.map((item, index) => {
        const src = item.thumbnail.path.includes('not_available')
          ? `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/landscape_small.jpg`
          : `${item.thumbnail.path}/standard_small.${item.thumbnail.extension}`;
        return (
          <S.Result key={index}>
            <C.Portrait
              src={src}
              width="45px"
              height="45px"
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
