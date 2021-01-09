import axios from 'axios';

const ENDPOINT = 'http://localhost:8000/api/wbxr';
// const ENDPOINT = 'http://ec2-52-5-208-93.compute-1.amazonaws.com/api/wbxr';

export const analyse3pCookies = async (url: string | string[]) => {
  const response = await axios.post(
    `${ENDPOINT}/analyze`,
    { uid: localStorage.getItem('uid'), urls: url },
    { headers: { accept: 'application/json', 'Content-Type': 'application/json' } },
  );
  return response.data.cookies;
};

type CookiesAPIResponse = {
  url: string;
  cookies: string[];
};
