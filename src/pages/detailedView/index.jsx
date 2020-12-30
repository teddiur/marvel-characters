import { useEffect, useState } from 'react';
import getMd5 from '../../services/md5';
import api from '../../services/api';
import {
  removeDuplicates,
  useWindowDimensions,
} from '../../services/generalFunctions';
import * as C from '../../components';
import * as S from './styledPage';
function checkTypes(character, params) {
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
        results.push(item);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return results;
}
function DetailedView(props) {
  const { speceficCharacter } = props;

  const [material, setMaterial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [firstShown, setFirstShown] = useState(0);
  const [types, setTypes] = useState([{ type: 'comics', hasMore: true }]);

  useEffect(() => {
    setTypes(checkTypes(speceficCharacter));
  }, [speceficCharacter]);
  // const [total, setTotal] = useState(0);

  const getMaterial = async (offset, material) => {
    const { ts, md5Hash } = getMd5();
    const { type } = material;

    await api
      .get(
        `characters/${speceficCharacter.id}/${type}?offset=${offset}&ts=${ts}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${md5Hash}`,
      )
      .then((response) => {
        const { results, total } = response.data.data;
        const theresMore = material.length < total;

        setLoading(false);
        setMaterial((prevChars) => {
          return removeDuplicates([...prevChars, ...results], 'id');
        });

        setHasMore(theresMore);
      })
      .catch((err) => console.log('ERROR:', err));
  };

  //deals with material shown
  const { width } = useWindowDimensions();
  const lastShown = getLastShown(width, firstShown);
  const materialShown = material.slice(firstShown, lastShown);
  const characterPortrait = `${speceficCharacter.thumbnail.path}/landscape_incredible.${speceficCharacter.thumbnail.extension}`;

  useEffect(() => {
    if (lastShown < material.length) {
      return;
    }
    if (hasMore) setOffset((previous) => previous + 20);
    else {
      setTypes((types) => types.slice(1));
      setOffset(0);
    }
    setLoading(true);
    getMaterial(offset, types[0]);
  }, [lastShown]); // eslint-disable-line

  return (
    <S.FlexWrapper
      direction="column"
      marginLeft="auto"
      marginRight="auto"
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
        {materialShown.map((item, index) => {
          const materialImage = `${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`;
          return (
            <>
              {index === 0 && firstShown !== 0 && (
                <C.CarouselButton
                  key="firstShown"
                  onClick={setFirstShown}
                  action="less"
                >{`<`}</C.CarouselButton>
              )}
              <C.Portrait
                key={materialImage}
                src={materialImage}
                alt={item.title}
                width="max(15%, 200px)"
                height="auto"
                margin="0 10px"
              />
              {index + 1 === materialShown.length &&
                lastShown + 1 <= material.length && (
                  <C.CarouselButton
                    key="lastShown"
                    onClick={setFirstShown}
                    action="more"
                  >{`>`}</C.CarouselButton>
                )}
              {loading && <p>loading</p>}
            </>
          );
        })}
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
export { DetailedView };
