import { MarvelLogo } from '../../assets/index';
import * as S from './styledLayout';

const Layout = ({ onClick, children }) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo
          onClick={() => onClick(null)}
          src={MarvelLogo}
          alt="Logo Marvel"
        />
      </S.Header>
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
};
export { Layout };
