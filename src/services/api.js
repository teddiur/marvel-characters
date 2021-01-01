import axios from 'axios';
import getMd5 from './md5';

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

export default api;
