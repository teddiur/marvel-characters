import { useRef, useState } from 'react';
import { MarvelLogo } from '../../assets/index';
import * as S from './styledLayout';

const Layout = ({ onClick, children }) => {
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();
  const [query, setQuery] = useState('');
  console.log(inputRef);
  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo
          onClick={() => onClick(null)}
          src={MarvelLogo}
          alt="Logo Marvel"
        />
        <S.Searchbar>
          <input
            ref={inputRef}
            onChange={(event) => {
              setQuery(event.target.value);
              console.log(inputRef);
            }}
          />
          <svg
            onClick={setInputFocus}
            width="48"
            height="47"
            viewBox="0 0 48 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="17.5" cy="17.5" r="16" strokeWidth="3" />
            <line
              x1="29.0399"
              y1="27.9186"
              x2="46.7176"
              y2="45.5963"
              strokeWidth="3"
            />
          </svg>
          <span>X</span>
        </S.Searchbar>
      </S.Header>
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
};
export { Layout };
