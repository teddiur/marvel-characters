import * as C from './styledCharacter';
import { forwardRef } from 'react';

const CharacterCard = forwardRef((props, ref) => {
  const { data, onClick } = props;
  const background = `${data.thumbnail.path}/landscape_incredible.${data.thumbnail.extension}`;

  return (
    <C.CardImage onClick={onClick} ref={ref} background={background}>
      <C.NameBox>{data.name}</C.NameBox>
    </C.CardImage>
  );
});
export { CharacterCard };
