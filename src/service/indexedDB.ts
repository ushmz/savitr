/* eslint-disable @typescript-eslint/camelcase */
import { ChromeRuntimeResponse, JunctionIDBTable, CookieIDBTable } from 'shared/types';

async function getArgsFromFile(url: string): Promise<string[]> {
  const response = await fetch(url);
  const initQuery = await response.text();
  const initQueryArray = initQuery.split('\n');
  return initQueryArray;
}

function formatString2Array(arrayLikeString: string): string[] {
  if (arrayLikeString) {
    return arrayLikeString.slice(1, -1).split('\\,');
  } else {
    return [];
  }
}

/**
 * Initialize user history information.
 */
export async function initializeHistory(): Promise<void> {
  const openReq: IDBOpenDBRequest = indexedDB.open('history', 1);

  // If table version < 1 (it means user dosen't have database)
  // Initialize database.
  openReq.onupgradeneeded = () => {
    // Get database connection object.
    const db: IDBDatabase = openReq.result;

    const historyStore: IDBObjectStore = db.createObjectStore('history', { autoIncrement: true });
    historyStore.createIndex('url', 'url', { unique: false });

    historyStore.transaction.oncomplete = () => {
      chrome.runtime.sendMessage(
        { method: 'history', query: { max: 1000 } },
        async (response: ChromeRuntimeResponse) => {
          const histories = response.data;

          const historyOS: IDBObjectStore = db.transaction('history', 'readwrite').objectStore('history');
          histories.forEach((history: object) => {
            historyOS.add(history);
          });
        },
      );
    };
    console.log('History Loaded.');
  };

  // If database version > 1, nothing to do.
  openReq.onsuccess = () => console.log('Successfully connected.');

  // If there is an error while connecting, display it.
  openReq.onerror = () => console.log(openReq.error);
}

/**
 * Initialize table with collected page data.
 */
export async function initializeTable(): Promise<void> {
  const openReq: IDBOpenDBRequest = indexedDB.open('savitri', 1);

  // If table version < 1 (it means user dosen't have database)
  // Initialize database.
  openReq.onupgradeneeded = async () => {
    console.log('Initializing...');

    const db: IDBDatabase = openReq.result;

    db.createObjectStore('cookie', { autoIncrement: true }).createIndex('domain', 'domain', { unique: false });

    db.createObjectStore('page', { autoIncrement: true }).createIndex('start_uri', 'start_uri', { unique: false });

    db.createObjectStore('page_cookie_junction', { autoIncrement: true }).createIndex('junction', 'page_id', {
      unique: false,
    });
    console.log('Tables initialized.');

    // Get all arguments dumped from SQL.
    const cookieFileUrl = chrome.runtime.getURL('init/cookie_essential.csv');
    const cookieTableArgs: string[] = await getArgsFromFile(cookieFileUrl);

    const pageFileUrl = chrome.runtime.getURL('init/page_essential.csv');
    const pageTableArgs: string[] = await getArgsFromFile(pageFileUrl);

    const junctionFileUrl = chrome.runtime.getURL('init/pc_junction_essential.csv');
    const junctionTableArgs: string[] = await getArgsFromFile(junctionFileUrl);
    console.log('Arguments OK.');

    // Start data insert transaction.
    const cookieTransaction: IDBTransaction = db.transaction(['cookie', 'page', 'page_cookie_junction'], 'readwrite');

    // Initialize `cookie` ObjectStore data.
    const cookieOS: IDBObjectStore = cookieTransaction.objectStore('cookie');
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

    // Initialize `page` ObjectStore data.
    const pageOS: IDBObjectStore = cookieTransaction.objectStore('page');
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

    // Initialize `page_cookie_junction` ObjectStore data.
    const pcjunctionOS: IDBObjectStore = cookieTransaction.objectStore('page_cookie_junction');
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

    // Transaction will be closed automatically.
    console.log('Initialize Finished.');
  };

  // If database version > 1, nothing to do.
  openReq.onsuccess = () => console.log('Already Done.');

  // If there is an error while connecting, display it.
  openReq.onerror = () => console.log(openReq.error);
}

// TODO: Refresh history ObjectStore with latest histories.
// async function refreshHistories() {}

/**
 * Get pageID from colected pages data.
 *
 * @param {string} target - Page URI
 * @return {Promise<string|status>} pageID - PageID
 */
export async function getPageId(target: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const openReq: IDBOpenDBRequest = indexedDB.open('savitri', 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに，initializeを行ってください．');
    };

    openReq.onsuccess = () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('page', 'readonly');

      const pageOS: IDBObjectStore = tx.objectStore('page');
      const pageIndex: IDBIndex = pageOS.index('start_uri');
      const request: IDBRequest = pageIndex.get(target);
      request.onsuccess = () => {
        if (request.result !== undefined) {
          const page = request.result;
          resolve(page.id);
        } else {
          reject({ status: true, cookies: [], error: 'NOT_COLLECTED', message: 'This page data not collected.' });
        }
      };
      request.onerror = () => {
        reject({ status: false, cookies: [], error: 'DB_QUERY_ERROR', message: 'There is an error in page table.' });
      };
    };
    openReq.onerror = () => {
      reject({
        status: false,
        cookies: [],
        error: 'DB_CONNECTION_ERROR',
        message: 'There is an error while connecting page table.',
      });
    };
  });
}

/**
 * Get IDs of cookie(domain) that given page contain
 * @param {string} pageId - Oage ID get from `getPageId`
 * @return {Promise<Array<string>|status>} - Listed cookie Id or (error) status object
 */
export async function getCookieIds(pageId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (!pageId) reject();
    const openReq: IDBOpenDBRequest = indexedDB.open('savitri', 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに，initializeを行ってください．');
    };

    openReq.onsuccess = () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('page_cookie_junction', 'readonly');

      const junctionOS: IDBObjectStore = tx.objectStore('page_cookie_junction');
      const junctionIndex: IDBIndex = junctionOS.index('junction');
      const getReq: IDBRequest = junctionIndex.getAll(pageId);

      getReq.onsuccess = () => {
        if (getReq.result.length > 0) {
          const junctions: JunctionIDBTable[] = getReq.result;
          resolve(junctions.map((junction) => junction.cookie_id));
        } else {
          reject({ status: true, cookies: [], error: 'NO_COOKIE_DETECTED', message: 'No cookie detected.' });
        }
      };
      getReq.onerror = () => {
        reject({
          status: false,
          cookies: [],
          error: 'DB_QUERY_ERROR',
          message: 'There is an error in junction table.',
        });
      };
    };
    openReq.onerror = () => {
      reject({
        status: false,
        cookies: [],
        error: 'DB_CONNECTION_ERROR',
        message: 'There is an error while connecting junction table.',
      });
    };
  });
}

/**
 * Get cookie information of given cookie ID
 * @param {string} cookieId - Get from `getCookieID()`
 * @return {Promise<cookie|status>} - Cookie information object or (error) status object
 */
export async function getCookie(cookieId: string): Promise<CookieIDBTable> {
  return new Promise((resolve, reject) => {
    if (!cookieId) reject();
    const openReq: IDBOpenDBRequest = indexedDB.open('savitri', 1);

    openReq.onupgradeneeded = () => {
      alert('はじめに，initializeを行ってください．');
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
        reject({ status: false, cookies: [], error: 'DB_QUERY_ERROR', message: 'There is an error in cookie table.' });
      };
    };

    openReq.onerror = () => {
      reject({
        status: false,
        cookies: [],
        error: 'DB_CONNECTION_ERROR',
        message: 'There is an error while connecting cookie table.',
      });
    };
  });
}

/**
 * Get cookie information from collected data
 *
 * @param {Array<string>} cookieIds - Listed string of cookie ID
 * @return {Promise<Array<cookie>>} cookies - Listed cookie informarion
 */
export async function getCookies(cookieIds: string[]): Promise<CookieIDBTable[]> {
  const cookies = [];
  for (const cookieId of cookieIds) {
    const cookie = await getCookie(cookieId);
    cookies.push(cookie);
  }
  return cookies;
}
