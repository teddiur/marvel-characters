import { useCallback } from 'react';

function useLastLoaded(loading, observer, setOffset, hasMore) {
  const lastLoadedChar = useCallback(
    (node) => {
      if (loading) return; //if it's loading i don't want to change the observer yet
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore) {
            setOffset((previous) => previous + 20);
          }
        },
        { threshold: 0.9 },
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore], //eslint-disable-line
    //observer is useref and setoffset is usestate
  );
  return lastLoadedChar;
}
export default useLastLoaded;
