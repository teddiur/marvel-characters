import { useRef, useState } from 'react';
import * as S from './styledSearch';
import { search, close } from '../../assets/';

function Searchbar({ query, setQuery, setOffset, setResultsVisible }) {
  const [inputRef, setInputFocus] = useFocus();
  const [isFocus, setIsFocus] = useState(false);

  function handleInput(event) {
    setQuery(event.target.value);
    setOffset(0);
    setTimeout(() => {
      setResultsVisible(true);
    }, 100);
  }

  function handleBlurInput() {
    setIsFocus(false);
    setTimeout(() => {
      setResultsVisible(false);
    }, 100);
  }

  function handleFocus() {
    setIsFocus(true);
    setInputFocus();
  }
  const inputActive = isFocus || query;

  return (
    <S.Searchbar searchRight={inputActive ? '100%' : 0}>
      <img src={search} alt="search" onClick={handleFocus} />
      <S.InputSearch
        ref={inputRef}
        value={query}
        onChange={(event) => {
          handleInput(event);
        }}
        onBlur={handleBlurInput}
        onFocus={() => setResultsVisible(true)}
      />
      {inputActive && (
        <S.CloseIcon src={close} alt="close" onClick={() => setQuery('')} />
      )}
    </S.Searchbar>
  );
}

function useFocus() {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
}
export { Searchbar };
