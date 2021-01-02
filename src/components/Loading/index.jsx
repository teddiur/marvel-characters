import * as S from './styledLoading';

function Loading({ width, numButtons }) {
  let colors = ['#800000', '#ba0f0f', '#b44646', '#ff7e7e', '#ff7e7e'];
  if (numButtons) colors = colors.slice(0, numButtons);

  return (
    <S.LoadingContainer width={width}>
      {colors.map((color, index) => (
        <S.Dot key={index} color={color} delay={index * 0.2} />
      ))}
    </S.LoadingContainer>
  );
}

export { Loading };
