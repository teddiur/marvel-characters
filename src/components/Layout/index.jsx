import { MarvelLogo } from '../../assets/index';
import * as S from './styledLayout';

const Layout = ({ children }) => {
  return (
    <>
      <S.Header>
        <S.Logo src={MarvelLogo} alt="Logo Marvel" />
      </S.Header>
      <S.Main>{children}</S.Main>
    </>
  );
};
export { Layout };
