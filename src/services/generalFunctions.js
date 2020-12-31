import { useState, useEffect } from 'react';

function removeDuplicates(arr, prop) {
  const propValues = arr.map((item) => item[prop]);
  const uniques = arr.filter(
    (element, index) => propValues.indexOf(element[prop]) === index,
  );
  return uniques;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export { removeDuplicates, useWindowDimensions };
