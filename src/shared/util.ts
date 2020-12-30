export const hasIntersection = (arr1: string[], arr2: string[]): boolean => {
  const set1 = new Set(...arr1);
  const set2 = new Set(...arr2);
  const intersection = new Set(Array.from(set1).filter((s) => set2.has(s)));
  return intersection.size === 0 ? false : true;
};

export const truncateText = (text: string, len: number): string => {
  return text.length <= len ? text : text.substr(0, len) + '...';
};
