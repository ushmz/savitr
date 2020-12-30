/* eslint-disable @typescript-eslint/camelcase */
import { JunctionIDBTable, CookieIDBTable, HistoryTable, PageIDBTable } from 'shared/types';
import { hasIntersection } from '../shared/util';
import { getHistoriesAsync } from './getAllHistory';

async function getLinesFromFile(url: string): Promise<string[]> {
  const response = await fetch(url);
  const fileContents = await response.text();
  const lines = fileContents.split('\n');
  return lines;
}

function formatString2Array(arrayLikeString: string): string[] {
  if (arrayLikeString) {
    return arrayLikeString.slice(1, -1).split('\\,');
  } else {
    return [];
  }
}

export async function initializeXrayed(): Promise<void> {
  return new Promise((resolve, reject) => {
    const openReq: IDBOpenDBRequest = indexedDB.open('xrayed', 1);

    openReq.onupgradeneeded = async () => {
      const db: IDBDatabase = openReq.result;

      db.createObjectStore('cookie', { autoIncrement: true }).createIndex('domain', 'domain', { unique: false });
      db.createObjectStore('page', { autoIncrement: true }).createIndex('start_uri', 'start_uri', { unique: false });
      db.createObjectStore('junction', { autoIncrement: true }).createIndex('junction', 'page_id', { unique: false });
    };

    openReq.onsuccess = async () => {
      const db = openReq.result;

      const cookieFileUrl = chrome.runtime.getURL('init/xrayed/cookie_essential.csv');
      const cookieTableArgs: string[] = await getLinesFromFile(cookieFileUrl);

      const pageFileUrl = chrome.runtime.getURL('init/xrayed/page_essential.csv');
      const pageTableArgs: string[] = await getLinesFromFile(pageFileUrl);

      const junctionFileUrl = chrome.runtime.getURL('init/xrayed/pc_junction_essential.csv');
      const junctionTableArgs: string[] = await getLinesFromFile(junctionFileUrl);

      const tx: IDBTransaction = db.transaction(['cookie', 'page', 'junction'], 'readwrite');

      const cookieOS: IDBObjectStore = tx.objectStore('cookie');
      cookieTableArgs.forEach((argLine) => {
        const args: string[] = argLine.split(',');
        const request: IDBRequest = cookieOS.add({
          domain: args[1],
          httponly: args[2],
          secure: args[3],
        });
        request.onerror = () => {
          console.log(request.error);
        };
      });

      const pageOS: IDBObjectStore = tx.objectStore('page');
      pageTableArgs.forEach((argLine) => {
        const args: string[] = argLine.split(/([^\\]),/);
        const request: IDBRequest = pageOS.add({
          id: args[0] + args[1],
          title: args[2] + args[3],
          start_uri: args[4] + args[5],
          final_uri: args[6] + args[7],
          requested_uris: formatString2Array(args[8] + args[9]),
          recieved_uris: formatString2Array(args[10] + args[11]),
        });
        request.onerror = () => {
          console.log(request.error);
        };
      });

      const pcjunctionOS: IDBObjectStore = tx.objectStore('junction');
      pcjunctionOS.clear();

      junctionTableArgs.forEach((argLine) => {
        const args: string[] = argLine.split(',');
        const request: IDBRequest = pcjunctionOS.add({
          page_id: args[0],
          cookie_id: args[1],
        });
        request.onerror = () => {
          console.log(request.error);
        };
      });
      console.log('X-rayed Data Inserted.');
      resolve();
    };

    openReq.onerror = () => reject();
  });
}

export async function dropAllDatabase(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const HistoryDBBDeleteRequest = indexedDB.deleteDatabase('history');
    HistoryDBBDeleteRequest.onerror = () => {
      console.log(HistoryDBBDeleteRequest.error);
    };
    const xrayedDBDeleteRequest = indexedDB.deleteDatabase('xrayed');
    xrayedDBDeleteRequest.onerror = () => {
      console.log(xrayedDBDeleteRequest.error);
    };
    const serpDBDeleteRequest = indexedDB.deleteDatabase('serp');
    serpDBDeleteRequest.onerror = () => {
      console.log(serpDBDeleteRequest.error);
    };
    resolve();
  });
}

/**
 * Get pageID from colected pages data.
 *
 * @param {string} target - Page URI
 * @return {Promise<string|status>} pageID - PageID
 */
export async function getPageId(table: 'xrayed' | 'serp', url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    url = decodeURI(url);
    let targetNoArgs: string;
    try {
      const matched = url.match(/^(.+?)\?.+$/);
      targetNoArgs = matched ? matched[0] : url;
    } catch {
      targetNoArgs = url;
    }

    const openReq: IDBOpenDBRequest = indexedDB.open(table, 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに履歴情報を作成してください．');
    };

    openReq.onsuccess = () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('page', 'readonly');

      const pageOS: IDBObjectStore = tx.objectStore('page');
      const pageIndex: IDBIndex = pageOS.index('start_uri');
      const request: IDBRequest = pageIndex.get(targetNoArgs);
      request.onsuccess = () => {
        if (request.result !== undefined) {
          const page = request.result;
          resolve(page.id);
        }
      };

      request.onerror = () => reject();
    };

    openReq.onerror = () => reject();
  });
}

export async function getCookieIds(table: 'xrayed' | 'serp', pageId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (!pageId) reject();
    const openReq: IDBOpenDBRequest = indexedDB.open(table, 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに履歴情報を作成してください．');
    };

    openReq.onsuccess = () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('junction', 'readonly');

      const junctionOS: IDBObjectStore = tx.objectStore('junction');
      const junctionIndex: IDBIndex = junctionOS.index('junction');
      const getReq: IDBRequest = junctionIndex.getAll(pageId);

      getReq.onsuccess = () => {
        if (getReq.result.length > 0) {
          const junctions: JunctionIDBTable[] = getReq.result;
          resolve(junctions.map((junction) => junction.cookie_id));
        }
      };

      getReq.onerror = () => reject();
    };

    openReq.onerror = () => reject();
  });
}

export async function getCookie(table: 'xrayed' | 'serp', cookieId: string): Promise<CookieIDBTable> {
  return new Promise((resolve, reject) => {
    if (!cookieId) reject();
    const openReq: IDBOpenDBRequest = indexedDB.open(table, 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに履歴情報を作成してください．');
    };

    openReq.onsuccess = () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('cookie', 'readonly');

      const cookieOS: IDBObjectStore = tx.objectStore('cookie');
      const request: IDBRequest = cookieOS.get(parseInt(cookieId));
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject();
      };
    };

    openReq.onerror = () => {
      reject();
    };
  });
}

/**
 * Get cookie information from collected data
 *
 * @param {Array<string>} cookieIds - Listed string of cookie ID
 * @return {Promise<Array<cookie>>} cookies - Listed cookie informarion
 */
export async function getCookies(table: 'xrayed' | 'serp', cookieIds: string[]): Promise<CookieIDBTable[]> {
  const cookies = [];
  for (const cookieId of cookieIds) {
    const cookie = await getCookie(table, cookieId);
    cookies.push(cookie);
  }
  return cookies;
}

/**
 * Get cookie information of given cookie ID
 */
export async function getCookieDomain(table: 'xrayed' | 'serp', cookieId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!cookieId) reject();
    const openReq: IDBOpenDBRequest = indexedDB.open(table, 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに履歴情報を作成してください．');
    };

    openReq.onsuccess = () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('cookie', 'readonly');

      const cookieOS: IDBObjectStore = tx.objectStore('cookie');
      const request: IDBRequest = cookieOS.get(parseInt(cookieId));
      request.onsuccess = () => {
        resolve(request.result.domain);
      };

      request.onerror = () => {
        reject();
      };
    };

    openReq.onerror = () => {
      reject();
    };
  });
}

export async function getCookieDomains(table: 'xrayed' | 'serp', cookieIds: string[]): Promise<string[]> {
  const cookies = [];
  for (const cookieId of cookieIds) {
    const cookie = await getCookieDomain(table, cookieId);
    cookies.push(cookie);
  }
  return cookies;
}

export async function initializeHistory(): Promise<void> {
  return new Promise((resolve, reject) => {
    const openReq: IDBOpenDBRequest = indexedDB.open('history', 1);

    // If table version < 1 (it means user dosen't have database)
    // Initialize database.
    openReq.onupgradeneeded = () => {
      // Get database connection object.
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
          console.log(error);
        }
      });
      console.log('History Data Inserted.');
      resolve();
    };

    // If database version > 1, nothing to do.
    openReq.onsuccess = () => {
      // console.log('Successfully connected.');
      // resolve();
    };

    // If there is an error while connecting, display it.
    openReq.onerror = () => {
      console.log(openReq.error);
      reject();
    };
  });
}

// Recieve cookie domains that SERPElement contain
export async function getCollectedHistory(domains: string[]): Promise<HistoryTable[]> {
  return new Promise((resolve, reject) => {
    const openReq = indexedDB.open('history', 1);
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
    };
  });
}

export async function initializeSearchResults(): Promise<void> {
  return new Promise((resolve, reject) => {
    const openReq: IDBOpenDBRequest = indexedDB.open('serp', 1);
    openReq.onupgradeneeded = async () => {
      const db = openReq.result;
      console.log('DB connected');

      db.createObjectStore('cookie', { autoIncrement: true }).createIndex('domain', 'domain', { unique: false });
      db.createObjectStore('page', { autoIncrement: true }).createIndex('start_uri', 'start_uri', { unique: false });
      db.createObjectStore('junction', { autoIncrement: true }).createIndex('junction', 'page_id', { unique: false });
      console.log('SERP Table Initialized.');
    };

    openReq.onsuccess = async () => {
      const db = openReq.result;
      const cookieFileUrl = chrome.runtime.getURL('init/serp/cookie_essential.csv');
      const serpCookieArgs: string[] = await getLinesFromFile(cookieFileUrl);

      const pageFileUrl = chrome.runtime.getURL('init/serp/page_essential_decoded.csv');
      const serpPageArgs: string[] = await getLinesFromFile(pageFileUrl);

      const junctionFileUrl = chrome.runtime.getURL('init/serp/pc_junction_essential.csv');
      const serpJunctionArgs: string[] = await getLinesFromFile(junctionFileUrl);
      console.log('files ok');

      const tx: IDBTransaction = db.transaction(['cookie', 'page', 'page_cookie_junction'], 'readwrite');
      const cookieOS: IDBObjectStore = tx.objectStore('cookie');
      serpCookieArgs.forEach((argLine) => {
        const args: string[] = argLine.split(',');
        const request: IDBRequest = cookieOS.add({
          domain: args[1],
          httponly: args[2],
          secure: args[3],
        });
        request.onerror = () => {
          console.log(request.error);
        };
      });
      console.log('cookie table');

      const pageOS: IDBObjectStore = tx.objectStore('page');
      serpPageArgs.forEach((argLine) => {
        const args: string[] = argLine.split(/([^\\]),/);
        const request: IDBRequest = pageOS.add({
          id: args[0] + args[1],
          title: args[2] + args[3],
          start_uri: args[4] + args[5],
          final_uri: args[6] + args[7],
          requested_uris: formatString2Array(args[8] + args[9]),
          recieved_uris: formatString2Array(args[10] + args[11]),
        });
        request.onerror = () => {
          console.log(request.error);
        };
      });
      console.log('page table');

      const pcjunctionOS: IDBObjectStore = tx.objectStore('page_cookie_junction');
      serpJunctionArgs.forEach((argLine) => {
        const args: string[] = argLine.split(',');
        const request: IDBRequest = pcjunctionOS.add({
          page_id: args[0],
          cookie_id: args[1],
        });
        request.onerror = () => {
          console.log(request.error);
        };
      });
      console.log('SERP Data Inserted.');
      resolve();
    };
    openReq.onerror = () => reject();
  });
}

export async function getResultRanged(page: number): Promise<PageIDBTable[]> {
  return new Promise((resolve, reject) => {
    const openReq = indexedDB.open('serp', 1);
    openReq.onsuccess = () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('page', 'readonly');

      const pagesOS: IDBObjectStore = tx.objectStore('page');
      const range = IDBKeyRange.bound(page * 10 + 1, (page + 1) * 10, false, true);
      const request: IDBRequest = pagesOS.getAll(range);
      request.onsuccess = () => {
        resolve(request.result);
      };
    };
    openReq.onerror = () => reject();
  });
}
