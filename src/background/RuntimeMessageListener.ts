/* global chrome */
import { HistoryQuery, RuntimeRequest } from 'shared/types';
import { uid } from '../shared/util';

chrome.runtime.onMessage.addListener((request: RuntimeRequest<HistoryQuery>, sender, sendResponse) => {
  chrome.history.search({ text: '', maxResults: request.query.max }, (histories) => {
    sendResponse({ data: histories, status: true });
  });
  return true;
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    localStorage.setItem('uid', uid());
  }
});
