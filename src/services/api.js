import axios from 'axios';
import getMd5 from './md5';
// const api = axios.create({
//   baseURL: 'https://gateway.marvel.com:443/v1/public/',
// });
const api = async (offset, beforeQ, afterQ) => {
  const { ts, md5Hash } = getMd5();
  let cancel;

  const result = await axios({
    method: 'GET',
    url: `https://gateway.marvel.com:443/v1/public/${beforeQ}?${afterQ}offset=${offset}&ts=${ts}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${md5Hash}`,
    cancelToken: new axios.CancelToken((cancelFunct) => (cancel = cancelFunct)),
  })
    .then((response) => response)
    .catch((error) => {
      if (axios.isCancel(error)) return;
    });

  return result;
};

export default api;
