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

export function deleteDuplicated<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

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

export const extractDomain = (url: string) => {
  const matched = url.match(/^https?:\/\/\.?(.*?)(\:[0-9].+)?($|\/|\?|\\\\|=)/);
  return matched ? matched[1] : '';
};

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

export const urlFilter = (url: string | undefined): boolean => {
  if (!url) {
    return false;
  }
  if (url.match('.+(pdf|ppt|pptx|doc|docx|txt|rtf|xls|xlsx|jpg|jepg|png|gif)$')) {
    return false;
  }
  if (url.match(/^https?:\/\/www\.google\.com\/search.+/)) {
    return false;
  }
  return true;
};
