import axios from 'axios';
import { encryptText } from '../shared/util';

const ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8000';

const isNotNeed = (url: string): boolean => {
  if (url.match(/.+(pdf|ppt|pptx|doc|docx|txt|rtf|xls|xlsx|jpg|jepg|png|gif)$/)) {
    return true;
  }
  if (url.match(/https?:\/\/[a-zA-Z0-9]+\.google\.com\/.+/)) {
    return true;
  }
  if (url.match(/^(?!http)/)) {
    return true;
  }
  if (url.match(/https?:\/\/github\.com\/.*/)) {
    return true;
  }
  return false;
};

export const analyse3pCookies = async (url: string): Promise<string[]> => {
  if (isNotNeed(url)) return [];
  const response = await axios.post(
    `${ENDPOINT}/api/wbxr/analyze`,
    { uid: localStorage.getItem('uid'), url: encryptText(url) },
    { headers: { accept: 'application/json', 'Content-Type': 'application/json' } },
  );
  return response.data.cookies;
};
