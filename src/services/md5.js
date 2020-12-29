import md5 from 'js-md5';

export default function getMd5() {
  const ts = new Date().getTime();
  const md5Hash = md5.create();
  md5Hash.update(
    ts +
      process.env.REACT_APP_MARVEL_PRIVATE_KEY +
      process.env.REACT_APP_MARVEL_PUBLIC_KEY,
  );
  return { ts, md5Hash };
}
