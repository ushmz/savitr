import axios from 'axios';
import { encryptText, isNotNeed } from '../shared/util';

const ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8000';

export const analyse3pCookies = async (url: string): Promise<string[]> => {
  if (isNotNeed(url)) return [];
  const response = await axios.post(
    `${ENDPOINT}/api/wbxr/analyze`,
    { uid: localStorage.getItem('uid'), url: encryptText(url) },
    { headers: { accept: 'application/json', 'Content-Type': 'application/json' } },
  );
  return response.data.cookies;
};
