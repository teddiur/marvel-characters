import * as C from './styledCharacter';

const CharacterCard = ({ data }) => {
  const background = `${data.thumbnail.path}/landscape_incredible.${data.thumbnail.extension}`;

  return (
    <C.CardImage background={background}>
      <C.NameBox>{data.name}</C.NameBox>
    </C.CardImage>
  );
};
export { CharacterCard };
