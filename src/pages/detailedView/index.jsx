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
  const { specificCharacter } = props;

  const [material, setMaterial] = useState({ id: '', data: [] });
  const [thumbMaterial, setThumbMaterial] = useState({ id: '', data: [] });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [firstShown, setFirstShown] = useState(0);
  const [types, setTypes] = useState(checkTypes(specificCharacter));
  const totalMaterial = useRef(0);
  const cancel = useRef(() => {});

  //deals with material shown
  const { width } = useWindowDimensions();
  const lastShown = getLastShown(width, firstShown);

  const materialShown = thumbMaterial.data.slice(firstShown, lastShown);

  if (totalMaterial.current === 0 && types.length !== 0) {
    totalMaterial.current = types.reduce(
      (acc, cur) => Number(acc.available) + Number(cur.available),
    );
  }

  const makeRequest = useCallback(
    async (offset, id, cancel) => {
      let type = 'comics';
      if (types.length > 0) type = types[0].type;
      else {
        return { results: [], total: 0 };
      }

      const beforeQ = `characters/${id}/${type}`;
      const response = await api(offset, beforeQ, '', cancel);
      const { results, total } = response.data.data;

      return { results, total };
    },
    [types],
  );

  useEffect(() => {
    if (lastShown < thumbMaterial.length) return;
    if (hasMore) setOffset((previous) => previous + 20);
    else if (material.length > 0 && types.length > 0) {
      setTypes((prev) => prev.slice(1));
      setOffset(0);
    }
  }, [lastShown, hasMore]); //eslint-disable-line

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { results, total } = await makeRequest(
        offset,
        specificCharacter.id,
        cancel,
      );
      if (results) {
        setLoading(false);
        if (material.id === specificCharacter.id) {
          setMaterial((prevChars) => {
            return {
              id: specificCharacter.id,
              data: removeDuplicates([...prevChars.data, ...results], 'id'),
            };
          });
        } else {
          setFirstShown(0);
          setMaterial(() => {
            return { id: specificCharacter.id, data: results };
          });
          const theresMore = material.length < total;
          setHasMore(theresMore);
        }
      }
    })();
  }, [makeRequest, offset, specificCharacter.id]); //eslint-disable-line

  useEffect(() => {
    setThumbMaterial(() => {
      const uniqueWithThumbnails = material.data.filter((item) => {
        return item.thumbnail;
      });
      return { id: specificCharacter.id, data: uniqueWithThumbnails };
    });
  }, [material]); //eslint-disable-line

  const characterPortrait = `${specificCharacter.thumbnail.path}/landscape_incredible.${specificCharacter.thumbnail.extension}`;
  return (
    <S.FlexWrapper
      direction="column"
      justify="flex-start"
      width="80%"
      padding="5% 0 0 0"
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
      <S.FlexWrapper justify="space-evenly" align="center" position="relative">
        {firstShown !== 0 && (
          <C.CarouselButton
            key="firstShown"
            onClick={setFirstShown}
            action="less"
          >
            {'<'}
          </C.CarouselButton>
        )}
        {materialShown.map((item, index) => {
          return (
            <S.Link key={index} href={item.urls[0].url}>
              <C.Portrait
                src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
                alt={item.title}
                width="100%"
                height="auto"
              />
            </S.Link>
          );
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
        {loading && <C.Loading width="max(15%, 200px)" numButtons="3" />}
        {!loading && materialShown.length === 0 && (
          <p>There is no material available</p>
        )}
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
  const charTypes = [];
  types.forEach((item) => {
    try {
      if (character[item.type].available > 0) {
        charTypes.push({
          type: item.type,
          available: Number(character[item.type].available),
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return charTypes;
}

export { DetailedView };
