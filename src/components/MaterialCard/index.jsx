import React, { useState, useRef } from 'react';
import * as C from '../';
import * as S from './styledMaterial';

function MaterialCard({ material }) {
  const [loading, setLoading] = useState(true);
  const display = loading ? 'none' : '';
  const startedLoading = useRef(Date.now());

  function handleLoaded() {
    const waitingTime = Date.now() - startedLoading;
    if (waitingTime < 100) {
      setTimeout(() => {
        setLoading(false);
      }, 100 - waitingTime);
      return;
    } else {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <C.Loading width="max(15%, 200px)" numButtons="3" />}
      <S.Link href={material.urls[0].url}>
        <C.Portrait
          src={`${material.thumbnail.path}/portrait_fantastic.${material.thumbnail.extension}`}
          alt={material.title}
          display={display}
          onLoad={handleLoaded}
          width="100%"
          height="auto"
        />
      </S.Link>
    </>
  );
}

export { MaterialCard };