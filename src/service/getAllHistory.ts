import { HistoryAPIParams } from '../shared/types';

let nextEndTimeToUse: number | undefined = 0;
const allItems: Array<chrome.history.HistoryItem> = [];
const itemIdToIndex: { [key: string]: unknown } = {};

/**
 *
 * @param {callback} callback - Callback exetuted when once request finished
 */
function getMoreHistory(callback: Function) {
  const params: HistoryAPIParams = { text: '', maxResults: 500 };
  params.startTime = 0;
  if (nextEndTimeToUse && nextEndTimeToUse > 0) params.endTime = nextEndTimeToUse;

  chrome.history.search(params, function (items) {
    let fetched = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id in itemIdToIndex) continue;
      fetched += 1;
      allItems.push(item);
      itemIdToIndex[item.id] = allItems.length - 1;
    }
    if (items && items.length > 0) {
      nextEndTimeToUse = items[items.length - 1].lastVisitTime;
    }
    callback(fetched);
  });
  return allItems;
}

export function getHistories() {
  return getMoreHistory((cnt: number) => {
    if (cnt > 0) {
      getHistories();
    }
  });
}

export async function getHistoriesAsync(): Promise<Array<chrome.history.HistoryItem>> {
  return new Promise((resolve, reject) => {
    getMoreHistory((cnt: number) => {
      if (allItems.length > 2000 || cnt <= 0) {
        resolve(allItems);
      } else {
        resolve(getHistoriesAsync());
      }
    });
  });
}
