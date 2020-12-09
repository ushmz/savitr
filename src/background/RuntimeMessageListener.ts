/* global chrome */
import { HistoryQuery, RuntimeRequest } from 'shared/types';

chrome.runtime.onMessage.addListener((request: RuntimeRequest<HistoryQuery>, sender, sendResponse) => {
  chrome.history.search({ text: '', maxResults: request.query.max }, (histories) => {
    sendResponse({ data: histories, status: true });
  });
  return true;
});

// 考えもの．保留．
// chrome.runtime.onInstalled.addListener((details) => {
//   if ((details.reason = 'installed')) {
//     await initializeTable();
//     await initializeHistory();
//   }
// });
