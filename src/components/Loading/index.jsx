import * as S from './styledLoading';

function Loading({ width, type = 'pulse' }) {
  const colors = ['#800000', '#ba0f0f', '#b44646', '#ff7e7e', '#ff7e7e'];
  const loaders = {
    pulse: colors.map((color, index) => (
      <S.Dot key={index} color={color} delay={index * 0.2} />
    )),
    beat: (
      <S.BeatingContainer width={width}>
        {colors.slice(0, 2).map((item, index) => {
          return (
            <S.BeatingDot
              bgColor={item}
              key={index}
              delay={index === 0 ? '2s' : '-1s'}
            />
          );
        })}
      </S.BeatingContainer>
    ),
  };

  return <S.LoadingContainer width={width}>{loaders[type]}</S.LoadingContainer>;
}

export { Loading };
