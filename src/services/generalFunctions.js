function removeDuplicates(arr, prop) {
  const propValues = arr.map((item) => item[prop]);
  const uniques = arr.filter(
    (element, index) => propValues.indexOf(element[prop]) === index,
  );
  return uniques;
}

export { removeDuplicates };
