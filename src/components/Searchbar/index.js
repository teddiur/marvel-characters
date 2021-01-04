import { useRef, useState, useEffect } from 'react';
import * as S from './styledSearch';
import { search, close } from '../../assets/';

function Searchbar({
  query,
  setQuery,
  setOffset,
  setResultsVisible,
  specificCharacter,
}) {
  const [inputRef, setInputFocus] = useFocus();
  const [isFocus, setIsFocus] = useState(false);
  const [currentChar, setCurrentCher] = useState(specificCharacter?.id);

  function handleInput(event) {
    setQuery(event.target.value);
    setOffset(0);
    setResultsVisible(true);
  }

  function handleFocus() {
    setResultsVisible(true);
    setIsFocus(true);
  }

  useEffect(
    () => {
      if (currentChar !== specificCharacter?.id) {
        setResultsVisible(false);
        setCurrentCher(specificCharacter?.id);
      }
    },
    [specificCharacter, currentChar], //eslint-disable-line
  ); //setResultsVisible is useState, it's a false warning

  return (
    <S.Searchbar>
      <S.InputSearch
        ref={inputRef}
        value={query}
        onChange={(event) => {
          handleInput(event);
        }}
        onFocus={handleFocus}
        onBlur={() =>
          setTimeout(() => {
            setIsFocus(false);
          }, 400)
        }
      />
      <S.SearchIcon
        right={isFocus ? '100%' : '0'}
        src={search}
        alt="search"
        onClick={setInputFocus}
      />
      {isFocus && (
        <S.CloseIcon
          src={close}
          alt="close"
          onClick={() => {
            setQuery('');
            console.log('PORRA');
          }}
        />
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
