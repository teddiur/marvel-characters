import { useEffect, useState } from 'react';
import getMd5 from '../../services/md5';
import api from '../../services/api';
import { removeDuplicates } from '../../services/generalFunctions';
import * as C from '../../components';
import * as S from './styledPage';

function DetailedView(props) {
  const { speceficCharacter } = props;
  const { ts, md5Hash } = getMd5();
  const [material, setMaterial] = useState([]);
  const [firstShown, setFirstShown] = useState(0);
  const [types, setTypes] = useState([
    { type: 'comics', hasMore: true },
    { type: 'events', hasMore: true },
    { type: 'series', hasMore: true },
    { type: 'stories', hasMore: true },
  ]);
  const type = 'comics';
  const baseURI = `characters/${speceficCharacter.id}/${type}?apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${md5Hash}&ts=${ts}`;

  async function getMaterial() {
    await api
      .get(baseURI)
      .then((response) => {
        const { results } = response.data.data;
        console.log(response, 'response');
        setMaterial((previous) =>
          removeDuplicates([...previous, ...results], 'id'),
        );
        // console.log(material, 'after', results);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getMaterial();
  }, []);

  const materialShown = material.slice(firstShown, firstShown + 4);
  const characterPortrait = `${speceficCharacter.thumbnail.path}/landscape_incredible.${speceficCharacter.thumbnail.extension}`;

  return (
    <S.FlexWrapper
      direction="column"
      marginLeft="auto"
      marginRight="auto"
      width="80%"
      padding="5% 0 0 0"
    >
      <S.FlexWrapper justify="flex-start" align="center" padding="0 0 40px 0">
        <C.Portrait
          src={characterPortrait}
          alt={speceficCharacter.name}
          width="max(25%, 350px)"
          height="max(25%, 350px)"
        />
        <S.FlexWrapper direction="column" justify="center" marginLeft="15px">
          <S.SubTitle>Name:</S.SubTitle>
          <S.Text>{speceficCharacter.name}</S.Text>
          <S.SubTitle>Description:</S.SubTitle>
          <S.Text>{speceficCharacter.description}</S.Text>
        </S.FlexWrapper>
      </S.FlexWrapper>
      <S.FlexWrapper justify="space-between" align="center" position="relative">
        {materialShown.map((item, index) => {
          const materialImage = `${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`;
          return (
            <>
              {index === 0 && firstShown !== 0 && (
                <C.CarouselButton
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
                firstShown + 4 <= material.length && (
                  <C.CarouselButton
                    onClick={setFirstShown}
                    action="more"
                  >{`>`}</C.CarouselButton>
                )}
            </>
          );
        })}
      </S.FlexWrapper>
    </S.FlexWrapper>
  );
}

export { DetailedView };
