import crypto from 'crypto-js';

export const getLinesFromFile = async (url: string): Promise<string[]> => {
  const response = await fetch(url);
  const fileContents = await response.text();
  const lines = fileContents.split('\n');
  return lines;
};

export const formatString2Array = (arrayLikeString: string): string[] => {
  if (arrayLikeString) {
    return arrayLikeString.slice(1, -1).split('\\,');
  } else {
    return [];
  }
};

export const hasIntersection = (arr1: string[], arr2: string[]): boolean => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const intersection = Array.from(set1).filter((s) => set2.has(s));
  return intersection.length == 0 ? false : true;
};

export const truncateText = (text: string, len: number): string => {
  return text.length <= len ? text : text.substr(0, len) + '...';
};

export function shuffle<T>(array: Array<T>): Array<T> {
  for (let i = array.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i);
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
  return array;
}

export const uid = () => {
  let uid = '',
    i,
    random;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uid += '-';
    }
    uid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uid;
};

export const isNotNeed = (url: string): boolean => {
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
  if (url.match(/https?:\/\/zoom\.us\/.*/)) {
    return true;
  }
  return false;
};

export const encryptText = (text: string): string => {
  const encKey = process.env.ENCRYPTION_KEY || '';
  if (!encKey) {
    throw Error('Configuration Error');
  }
  const iv = crypto.lib.WordArray.random(16);
  // Interpret key as Base64 encoded
  const key = crypto.enc.Base64.parse(encKey);

  // Use CBC-mode and PKCS7-padding
  const encrypted = crypto.AES.encrypt(text, key, { iv: iv });
  // Concat IV and Ciphertext
  const joinedData = iv.clone().concat(encrypted.ciphertext);
  const joinedDataB64 = crypto.enc.Base64.stringify(joinedData);

  return joinedDataB64;
};
