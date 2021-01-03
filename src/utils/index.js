function getLastShown(width, firstShown) {
  const boxWidth = width - 210;
  const increment =
    Math.floor(boxWidth / 250) < 1 ? 1 : Math.floor(boxWidth / 250);
  return firstShown + increment;
}

function checkTypes(character) {
  const types = [
    { type: 'comics', hasMore: true },
    { type: 'events', hasMore: true },
    { type: 'series', hasMore: true },
    { type: 'stories', hasMore: true },
  ];
  const charTypes = [];
  types.forEach((item) => {
    try {
      if (character[item.type].available > 0) {
        charTypes.push({
          type: item.type,
          available: Number(character[item.type].available),
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return charTypes;
}

export { getLastShown, checkTypes };
