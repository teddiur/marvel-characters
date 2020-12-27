import * as C from './styledCharacter';

const CharacterCard = ({ data }) => {
  const background = `${data.thumbnail.path}/landscape_incredible.${data.thumbnail.extension}`;

  return <C.CardImage></C.CardImage>;
};
export { CharacterCard };
