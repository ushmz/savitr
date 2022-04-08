import { preTaskUrl, postTaskUrl } from 'shared/config';

export * from 'shared/utils/webstorage';

export const getPreTaskEnqueteURLByGroupId = (group: string): string => {
  switch (group) {
    case '1':
      return preTaskUrl.shopping.icon;
    case '2':
      return preTaskUrl.desease.icon;
    case '3':
      return preTaskUrl.shopping.controled;
    case '4':
      return preTaskUrl.desease.controled;
    case '5':
      return preTaskUrl.shopping.distribution;
    case '6':
      return preTaskUrl.desease.distribution;
    default:
      return '/error/404';
  }
};

export const getPostTaskEnqueteURLByGroupId = (group: string): string => {
  switch (group) {
    case '1':
      return postTaskUrl.shopping.icon;
    case '2':
      return postTaskUrl.desease.icon;
    case '3':
      return postTaskUrl.shopping.controled;
    case '4':
      return postTaskUrl.desease.controled;
    case '5':
      return postTaskUrl.shopping.distribution;
    case '6':
      return postTaskUrl.desease.distribution;
    default:
      return '/error/404';
  }
};

export function shuffle<T>(array: Array<T>): Array<T> {
  for (let i = array.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i);
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
  return array;
}
