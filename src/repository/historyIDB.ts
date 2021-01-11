import { HistoryTable } from '../shared/types';
import { deleteDuplicated, extractDomain, hasIntersection, urlFilter } from '../shared/util';
import { analyse3pCookies } from './analyzeAPI';
import { getAllHistoriesAsync, getHistoriesCallback } from './chromeHistoryAPI';
import { getPageId, getCookieIds, getCookieDomains, get3pCookieDomainNames } from './xrayedIDB';

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

      const histories = await getAllHistoriesAsync();
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

export async function initializeHistoryByAPI(): Promise<void> {
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

      const histories = await getAllHistoriesAsync(500);
      histories.forEach(async (history: chrome.history.HistoryItem) => {
        try {
          if (!history.url) throw Error;
          if (urlFilter(history.url)) {
            const cookies = await analyse3pCookies(history.url);
            const historyData: HistoryTable = {
              title: `${history.title}`,
              url: `${history.url}`,
              cookies: deleteDuplicated(cookies[0].cookies),
            };

            if (historyData.cookies.length != 0) {
              const itx: IDBTransaction = db.transaction('history', 'readwrite');
              const historyStore: IDBObjectStore = itx.objectStore('history');
              historyStore.add(historyData);
            }
          }
        } catch (error) {
          // Do nothing intentionally. (Pass the URL)
        }
      });
      console.log('History Data Inserted.');
      resolve();
    };

    openReq.onerror = () => {
      console.log(openReq.error);
      reject();
    };
  });
}

export async function initializeHistoryDomainBase(): Promise<void> {
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

      // const histories = await getAllHistoriesAsync();
      // histories.forEach(async (history: chrome.history.HistoryItem) => {
      //   try {
      //     if (!history.url) throw Error;
      //     const domain = extractDomain(history.url);
      //     const cookies = await get3pCookieDomainNames(domain);
      //     console.log(domain, cookies);

      //     if (cookies) {
      //       const historyData: HistoryTable = {
      //         title: `${history.title}`,
      //         url: `${history.url}`,
      //         cookies: cookies,
      //       };

      //       const itx: IDBTransaction = db.transaction('history', 'readwrite');
      //       const historyStore: IDBObjectStore = itx.objectStore('history');
      //       historyStore.add(historyData);
      //     }
      //   } catch (error) {
      //     // Do nothing intentionally. (Pass the URL)
      //   }
      // });

      await getHistoriesCallback(500, (histories) => {
        histories.forEach(async (history: chrome.history.HistoryItem) => {
          try {
            if (!history.url) throw Error;
            const domain = extractDomain(history.url);
            const cookies = await get3pCookieDomainNames(domain);

            if (cookies) {
              const historyData: HistoryTable = {
                title: `${history.title}`,
                url: `${history.url}`,
                cookies: cookies,
              };

              const itx: IDBTransaction = db.transaction('history', 'readwrite');
              const historyStore: IDBObjectStore = itx.objectStore('history');
              historyStore.add(historyData);
            }
          } catch (error) {
            // Do nothing intentionally. (Pass the URL)
          }
        });
      });
      console.log('History Data Inserted.');
      resolve();
    };

    openReq.onerror = () => {
      console.log(openReq.error);
      reject();
    };
  });
}

// TODO
export async function getCollectedHistoryBomainBase(domains: string[]): Promise<HistoryTable[]> {
  return new Promise((resolve, reject) => {
    const openReq = indexedDB.open('history', 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに履歴情報を作成してください。');
    };

    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction('history', 'readonly');
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
