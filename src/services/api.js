import axios from 'axios';
import md5 from 'js-md5';

function getMd5() {
  const ts = new Date().getTime();
  const md5Hash = md5.create();
  md5Hash.update(
    ts +
      process.env.REACT_APP_MARVEL_PRIVATE_KEY +
      process.env.REACT_APP_MARVEL_PUBLIC_KEY,
  );
  return { ts, md5Hash };
}

const api = async (offset, beforeQ, afterQ, cancel) => {
  const { ts, md5Hash } = getMd5();
  const url = `https://gateway.marvel.com:443/v1/public/${beforeQ}?${afterQ}offset=${offset}&ts=${ts}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${md5Hash}`;
  // let cancel;

  const result = await axios({
    method: 'GET',
    url: url,
    cancelToken: new axios.CancelToken(
      (cancelFunct) => (cancel.current = cancelFunct),
    ),
  })
    .then((response) => response)
    .catch((error) => {
      if (axios.isCancel(error)) return;
    });

  return result;
};
async function makeRequest(offset, id, cancel, types) {
  if (types.length === 0) return { results: [], total: 0 };
  const type = types[0].type;

  const beforeQ = `characters/${id}/${type}`;
  const response = await api(offset, beforeQ, '', cancel);
  const { results, total } = response.data.data;

  return { results, total };
}
export { makeRequest };
export default api;
