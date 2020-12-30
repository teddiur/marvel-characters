import * as C from './styledCharacter';
import { forwardRef } from 'react';

const CharacterCard = forwardRef((props, ref) => {
  const { data } = props;
  const background = `${data.thumbnail.path}/landscape_incredible.${data.thumbnail.extension}`;

  return (
    <C.CardImage ref={ref} background={background}>
      <C.NameBox>{data.name}</C.NameBox>
    </C.CardImage>
  );
});
export { CharacterCard };
