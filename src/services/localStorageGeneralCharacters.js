import { removeDuplicates } from './generalFunctions';
import api from './api';

const myStorage = window.localStorage;
const makeRequest = async (offset, cancel) => {
  const url = 'characters';

  const response = await api(offset, url, '', cancel);
  if (response) {
    const { results, total } = response.data.data;
    return { results, total };
  }
  return { results: [], total: 0 };
};

export default async function getData(offset, cancel, days = 1) {
  let localResults = myStorage.getItem('results')
    ? JSON.parse(myStorage.getItem('results'))
    : [];

  if (shouldUseLocalStorage(offset, days)) {
    const results = JSON.parse(myStorage.getItem('results')).slice(
      offset,
      offset + 20,
    );
    const total = JSON.parse(myStorage.getItem('total'));
    return { results, total };
  }

  if (!isDataNew(days) && offset === 0) {
    localResults = [];
    myStorage.setItem('lastRequest', new Date().toJSON());
  }
  const { results, total } = await makeRequest(offset, cancel);
  const allResults = removeDuplicates([...localResults, ...results], 'id');

  myStorage.setItem('results', JSON.stringify(formatForStorage(allResults)));
  myStorage.setItem('total', total);

  return { results, total };
}

function formatForStorage(arr) {
  const formatted = arr.map((item) => {
    return {
      id: item.id,
      name: item.name,
      thumbnail: item.thumbnail,
      comics: item.comics,
      series: item.series,
      stories: item.stories,
      events: item.events,
      description: item.description,
      urls: item.urls,
    };
  });
  return formatted;
}

function shouldUseLocalStorage(offset, days) {
  if (!myStorage.getItem('results')) return false;
  const requestedData = JSON.parse(myStorage.getItem('results')).slice(
    offset,
    offset + 20,
  );
  const isThereDataInLocalStorage = !!requestedData[0];

  return isThereDataInLocalStorage && isDataNew(days);
}

function isDataNew(days) {
  const lastRequest = new Date(myStorage.getItem('lastRequest'));
  if (!lastRequest) return true;
  const now = new Date();

  const daysSinceRequest = Math.floor(
    (now.getTime() - lastRequest.getTime()) / (1000 * 60 * 60 * 24), //how many milisseconds there are in a day
  );

  const isDataNew = daysSinceRequest < days;
  return isDataNew;
}
