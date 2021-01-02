import { useRef } from 'react';
import * as S from './styledSearch';
import { search } from '../../assets/';

function Searchbar({ setIsFocus, query, setQuery, setOffset }) {
  const [inputRef, setInputFocus] = useFocus();

  function handleInput(event) {
    setQuery(event.target.value);
    setOffset(0);
  }

  function handleBlurInput() {
    setTimeout(() => {
      setQuery('');
    }, 100);
  }
  return (
    <S.Searchbar>
      <S.InputSearch
        ref={inputRef}
        value={query}
        onChange={(event) => {
          handleInput(event);
        }}
        onBlur={handleBlurInput}
      />
      <img src={search} alt="search" onClick={setInputFocus} />
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
