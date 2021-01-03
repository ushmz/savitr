import { HistoryTable } from '../shared/types';
import { hasIntersection } from '../shared/util';
import { getHistoriesAsync } from './chromeHistoryAPI';
import { getPageId, getCookieIds, getCookieDomains, getCookies } from './xrayedIDB';

export async function initializeHistory(): Promise<void> {
  return new Promise((resolve, reject) => {
    const openReq: IDBOpenDBRequest = indexedDB.open('history', 1);

    openReq.onupgradeneeded = () => {
      const db: IDBDatabase = openReq.result;
      db.createObjectStore('history', { autoIncrement: true });
    };

    openReq.onsuccess = async () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('history', 'readwrite');
      const historyOS: IDBObjectStore = tx.objectStore('history');
      historyOS.clear();
      console.log('History Table Initialized.');

      const histories = await getHistoriesAsync();
      console.log('History Data Loaded.');
      histories.forEach(async (history: chrome.history.HistoryItem) => {
        try {
          const pageid = await getPageId('xrayed', history.url || '');
          const cookieids = await getCookieIds('xrayed', pageid);
          const cookies = await getCookieDomains('xrayed', cookieids);

          const historyData: HistoryTable = {
            title: `${history.title}`,
            url: `${history.url}`,
            cookies: cookies,
          };

          const itx: IDBTransaction = db.transaction('history', 'readwrite');
          const historyStore: IDBObjectStore = itx.objectStore('history');
          historyStore.add(historyData);
        } catch (error) {
          // Do nothing intentionally. (Pass the URL)
        }
      });
      console.log('History Data Inserted.');
      resolve();
    };

    openReq.onsuccess = async () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('history', 'readwrite');

      const historyOS: IDBObjectStore = tx.objectStore('history');
      historyOS.clear();

      const histories = await getHistoriesAsync();
      histories.forEach(async (history: chrome.history.HistoryItem) => {
        try {
          const pageid = await getPageId('xrayed', history.url || '');
          const cookieids = await getCookieIds('xrayed', pageid);
          const cookies = await getCookies('xrayed', cookieids);

          const historyData: object = {
            title: history.title,
            url: history.url,
            cookies: cookies,
          };
          historyOS.add(historyData);
        } catch (error) {
          // Do nothing intentionally. (Pass the URL)
        }
      });
      resolve();
    };

    openReq.onerror = () => {
      console.log(openReq.error);
      reject();
    };
  });
}

export async function getCollectedHistory(domains: string[]): Promise<HistoryTable[]> {
  return new Promise((resolve, reject) => {
    const openReq = indexedDB.open('history', 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに履歴情報を作成してください。');
    };

    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction('history', 'readwrite');
      const historyOS = tx.objectStore('history');
      const historiesReq = historyOS.getAll();
      historiesReq.onsuccess = () => {
        const histories = historiesReq.result;
        const collected = histories.filter((h) => hasIntersection(h.cookies, domains));
        resolve(collected);
      };
      historiesReq.onerror = () => reject();
    };
    openReq.onerror = () => reject();
  });
}
