import { useEffect, useState } from 'react';
import getMd5 from '../../services/md5';
import api from '../../services/api';
import { removeDuplicates } from '../../services/generalFunctions';
import * as S from './styledPage';
import { Portrait } from '../../components';

function DetailedView(props) {
  const { speceficCharacter } = props;
  const { ts, md5Hash } = getMd5();
  const [material, setMaterial] = useState([]);
  const [firstShown, setFirstShwon] = useState(0);

  const type = 'comics';
  const baseURI = `characters/${speceficCharacter.id}/${type}?apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${md5Hash}&ts=${ts}`;

  async function getComics() {
    await api
      .get(baseURI)
      .then((response) => {
        const { results } = response.data.data;
        console.log(material, 'before');
        setMaterial((previous) =>
          removeDuplicates([...previous, ...results], 'id'),
        );
        console.log(material, 'after', results);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getComics();
  }, []);

  const materialShwon = material.slice(firstShown, 4);
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
        <Portrait
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
      <S.FlexWrapper justify="space-between">
        {materialShwon.map((item) => {
          const materialImage = `${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`;
          return (
            <Portrait
              key={materialImage}
              src={materialImage}
              alt={item.title}
              width="max(15%, 200px)"
              height="auto"
            />
          );
        })}
      </S.FlexWrapper>
    </S.FlexWrapper>
  );
}

export { DetailedView };
