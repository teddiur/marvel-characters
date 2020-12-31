import { useEffect, useState, useRef, useCallback } from 'react';
// import getMd5 from '../../services/md5';
import api from '../../services/api';
import {
  removeDuplicates,
  useWindowDimensions,
} from '../../services/generalFunctions';
import * as C from '../../components';
import * as S from './styledPage';

function DetailedView(props) {
  const { speceficCharacter } = props;

  const [material, setMaterial] = useState([]);
  const [thumbMaterial, setThumbMaterial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [firstShown, setFirstShown] = useState(0);
  const [types, setTypes] = useState(checkTypes(speceficCharacter));
  const totalMaterial = useRef(0);
  const id = useRef(speceficCharacter.id);

  //deals with material shown
  const { width } = useWindowDimensions();
  const lastShown = getLastShown(width, firstShown);
  const materialShown = thumbMaterial.slice(firstShown, lastShown);
  const characterPortrait = `${speceficCharacter.thumbnail.path}/landscape_incredible.${speceficCharacter.thumbnail.extension}`;

  if (totalMaterial.current === 0) {
    types.forEach((type) => {
      totalMaterial.current = Number(totalMaterial.current) + type.available;
    });
  }

  const makeRequest = useCallback(
    async (offset, id) => {
      let type = 'comics';
      if (types[0]) type = types[0].type;
      else return;

      const beforeQ = `characters/${id.current}/${type}`;
      const response = await api(offset, beforeQ, '');
      const { results, total } = response.data.data;

      setLoading(false);
      setMaterial((prevChars) => {
        const unique = removeDuplicates([...prevChars, ...results], 'id');
        const theresMore = unique.length < total;
        setHasMore(theresMore);
        return unique;
      });
    },
    [types],
  );

  useEffect(() => {
    if (lastShown < thumbMaterial.length) return;
    if (hasMore) setOffset((previous) => previous + 20);
    else if (material.length > 0 && types.length > 0) {
      setTypes((prev) => prev.slice(1));
      setOffset(0);
    } else {
      return;
    }
  }, [lastShown, hasMore]); //eslint-disable-line

  useEffect(() => {
    if (types) {
      setLoading(true);
      makeRequest(offset, id);
    }
  }, [makeRequest, offset, id, types]);

  useEffect(() => {
    setThumbMaterial(() => {
      const uniqueWithThumbnails = material.filter((item) => {
        return item.thumbnail;
      });
      return uniqueWithThumbnails;
    });
  }, [material]);
  console.log(thumbMaterial);
  return (
    <S.FlexWrapper direction="column" width="80%" padding="5% 0 0 0">
      <S.FlexWrapper
        justify="flex-start"
        direction={width > 850 ? 'row' : 'column'}
        align="center"
        padding="0 0 40px 0"
      >
        <C.Portrait
          src={characterPortrait}
          alt={speceficCharacter.name}
          width="clamp(25%, 350px, 100%)"
          height="auto"
        />
        <S.FlexWrapper direction="column" justify="center" marginLeft="15px">
          <S.SubTitle>Name:</S.SubTitle>
          <S.Text>{speceficCharacter.name}</S.Text>
          <S.SubTitle>Description:</S.SubTitle>
          <S.Text>
            {speceficCharacter.description || 'Description not available.'}
          </S.Text>
        </S.FlexWrapper>
      </S.FlexWrapper>
      <S.FlexWrapper justify="space-between" align="center" position="relative">
        {firstShown !== 0 && (
          <C.CarouselButton
            key="firstShown"
            onClick={setFirstShown}
            action="less"
          >{`<`}</C.CarouselButton>
        )}
        {materialShown.map((item, index) => {
          console.log(`url${index}`, item.urls);
          return (
            <>
              <S.Link href={item.urls[0].url}>
                <C.Portrait
                  key={index}
                  src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
                  alt={item.title}
                  width="100%"
                  height="auto"
                  // margin="0 10px"
                />
              </S.Link>
            </>
          );
        })}
        {lastShown + 1 <= thumbMaterial.length && (
          <C.CarouselButton
            key="lastShown"
            onClick={setFirstShown}
            action="more"
          >{`>`}</C.CarouselButton>
        )}
        {loading && <C.Loading />}
      </S.FlexWrapper>
    </S.FlexWrapper>
  );
}

function getLastShown(width, firstShown) {
  const boxWidth = width - 210;
  const increment =
    Math.floor(boxWidth / 250) < 1 ? 1 : Math.floor(boxWidth / 250);
  return firstShown + increment;
}

function checkTypes(character) {
  const types = [
    { type: 'comics', hasMore: true },
    { type: 'events', hasMore: true },
    { type: 'series', hasMore: true },
    { type: 'stories', hasMore: true },
  ];
  const results = [];
  types.forEach((item) => {
    try {
      if (character[item.type].available > 0) {
        results.push({
          type: item.type,
          available: Number(character[item.type].available),
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return results;
}

export { DetailedView };
