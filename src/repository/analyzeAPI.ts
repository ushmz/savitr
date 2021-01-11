import axios from 'axios';
import { encryptText } from '../shared/util';

const ENDPOINT = 'http://ec2-52-5-208-93.compute-1.amazonaws.com';

export const analyse3pCookies = async (url: string): Promise<string[]> => {
  const response = await axios.post(
    `${ENDPOINT}/api/wbxr/analyze`,
    { uid: localStorage.getItem('uid'), urls: encryptText(url) },
    { headers: { accept: 'application/json', 'Content-Type': 'application/json' } },
  );
  return response.data.cookies;
};
