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

// ???
const encrypt = (text: string) => {
  const key = process.env.ENCRYPTION_KEY || '';
  if (!key) {
    throw Error('Configuration Error');
  }

  const encrypted = crypto.AES.encrypt(text, key);
  console.log('encrypted', encrypted);
  return encrypted.iv.toString() + ':' + encrypted.ciphertext.toString();
};

export const encryptText = (text: string) => {
  const iv = crypto.lib.WordArray.random(16); // Generate a random 16 bytes IV
  const key = crypto.enc.Base64.parse('aR1h7EefwlPNVkvTHwfs6w=='); // Interpret key as Base64 encoded

  const encrypted = crypto.AES.encrypt(text, key, { iv: iv }); // Use CBC-mode and PKCS7-padding
  const joinedData = iv.clone().concat(encrypted.ciphertext); // Concat IV and Ciphertext
  const joinedDataB64 = crypto.enc.Base64.stringify(joinedData);

  console.log(joinedDataB64);
  console.log(joinedDataB64.replace(/(.{64})/g, '$1\n'));
  return joinedDataB64;
};
