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
