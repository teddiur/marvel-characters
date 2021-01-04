import { useEffect, useState, useRef } from 'react';
import { makeRequest } from '../../services/api';
import {
  removeDuplicates,
  useWindowDimensions,
} from '../../services/generalFunctions';
import { getLastShown, checkTypes } from '../../utils';
import * as C from '../../components';
import * as S from './styledPage';

function DetailedView(props) {
  const { specificCharacter } = props;
  const { id } = specificCharacter;

  const [material, setMaterial] = useState({ id: 0, data: [] });
  const [thumbMaterial, setThumbMaterial] = useState({ id: 0, data: [] });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [firstShown, setFirstShown] = useState(0);
  const [types, setTypes] = useState(checkTypes(specificCharacter));
  const cancel = useRef(() => {});

  //deals with material shown
  const { width } = useWindowDimensions();
  const lastShown = getLastShown(width, firstShown);
  const materialShown = thumbMaterial.data.slice(firstShown, lastShown);

  useEffect(() => {
    //this effect either starts a chain reaction that ends with a request or kills it here
    if (lastShown < thumbMaterial.length) return;
    if (hasMore) setOffset((previous) => previous + 20);
    else if (material.length > 0 && types.length > 0) {
      setTypes((prev) => prev.slice(1));
      setOffset(0);
    }
  }, [lastShown, hasMore, thumbMaterial, material, types]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { results, total } = await makeRequest(offset, id, cancel, types);
      setLoading(false);

      if (results) {
        if (material.id === id) {
          setMaterial((prevChars) => {
            return {
              id,
              data: removeDuplicates([...prevChars.data, ...results], 'id'),
            };
          });
        } else {
          setFirstShown(0);
          setMaterial(() => {
            return { id, data: results };
          });
        }

        const theresMore = material.length < total;
        setHasMore(theresMore);
      }
    })();
  }, [types, offset, id]); //eslint-disable-line

  useEffect(() => {
    //used a separated useEffect because material state was not updating before setThumbMaterial was running
    setThumbMaterial(() => {
      const uniqueWithThumbnails = material.data.filter((item) => {
        return item.thumbnail;
      });
      return { id, data: uniqueWithThumbnails };
    });
  }, [material]); //eslint-disable-line

  const characterPortrait = `${specificCharacter.thumbnail.path}/landscape_incredible.${specificCharacter.thumbnail.extension}`;
  return (
    <S.FlexWrapper
      direction="column"
      justify="flex-start"
      width="80%"
      padding="5% 0 0 0"
      key={String(specificCharacter.id)}
    >
      <S.FlexWrapper
        justify="flex-start"
        direction={width > 850 ? 'row' : 'column'}
        align="center"
        padding="0 0 40px 0"
      >
        <C.Portrait
          src={characterPortrait}
          alt={specificCharacter.name}
          width="clamp(25%, 350px, 100%)"
          height="auto"
        />
        <S.FlexWrapper direction="column" justify="center" marginLeft="15px">
          <S.SubTitle>Name:</S.SubTitle>
          <S.Text>{specificCharacter.name}</S.Text>
          <S.SubTitle>Description:</S.SubTitle>
          <S.Text>
            {specificCharacter.description || 'Description not available.'}
          </S.Text>
        </S.FlexWrapper>
      </S.FlexWrapper>
      <S.FlexWrapper
        height="310px"
        justify={firstShown + 1 === lastShown ? 'center' : 'space-evenly'}
        align="center"
        position="relative"
      >
        {firstShown !== 0 && (
          <C.CarouselButton
            key="firstShown"
            onClick={setFirstShown}
            action="less"
          >
            {'<'}
          </C.CarouselButton>
        )}
        {materialShown.map((item) => {
          return <C.MaterialCard key={String(item.id)} material={item} />;
        })}
        {lastShown + 1 <= thumbMaterial.data.length && (
          <C.CarouselButton
            key="lastShown"
            onClick={setFirstShown}
            action="more"
          >
            {'>'}
          </C.CarouselButton>
        )}
        {loading && <C.Loading width="200px" numButtons="3" type="beat" />}
        {!loading && materialShown.length === 0 && (
          <p>There is no material available</p>
        )}
      </S.FlexWrapper>
    </S.FlexWrapper>
  );
}

export { DetailedView };
