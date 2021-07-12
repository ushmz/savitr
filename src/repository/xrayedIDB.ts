import { JunctionIDBTable, CookieIDBTable } from '../shared/types';
import { getLinesFromFile, formatString2Array } from '../shared/util';

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
      const db: IDBDatabase = openReq.result;

      const cookieFileUrl = chrome.runtime.getURL('init/xrayed/cookie_essential.csv');
      const cookieTableArgs: string[] = await getLinesFromFile(cookieFileUrl);

      const pageFileUrl = chrome.runtime.getURL('init/xrayed/page_essential.csv');
      const pageTableArgs: string[] = await getLinesFromFile(pageFileUrl);

      const junctionFileUrl = chrome.runtime.getURL('init/xrayed/pc_junction_essential.csv');
      const junctionTableArgs: string[] = await getLinesFromFile(junctionFileUrl);

      const tx: IDBTransaction = db.transaction(['cookie', 'page', 'junction'], 'readwrite');

      /**
       * In following three steps, reading data is enough small so that version change
       * transactions is lasting until all data has been inserted. If `x-rayed` data
       * gets too big and take longer time than version change transaction, begin (and end)
       * transaction inside of `.forEach()` function.
       */
      const cookieOS: IDBObjectStore = tx.objectStore('cookie');
      cookieOS.clear();

      cookieTableArgs.forEach((argLine) => {
        const args: string[] = argLine.split(',');
        const request: IDBRequest = cookieOS.add({
          domain: args[1],
          httponly: args[2],
          secure: args[3],
        });
        request.onerror = () => {
          console.log(request.error);
          reject();
        };
      });

      const pageOS: IDBObjectStore = tx.objectStore('page');
      pageOS.clear();

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
          reject();
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
          reject();
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
      reject();
    };
    const xrayedDBDeleteRequest = indexedDB.deleteDatabase('xrayed');
    xrayedDBDeleteRequest.onerror = () => {
      console.log(xrayedDBDeleteRequest.error);
      reject();
    };
    const serpDBDeleteRequest = indexedDB.deleteDatabase('serp');
    serpDBDeleteRequest.onerror = () => {
      console.log(serpDBDeleteRequest.error);
      reject();
    };
    resolve();
  });
}

export async function getPageId(table: string, url: string): Promise<string> {
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
      alert('はじめに履歴情報を作成してください。');
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
        } else {
          /**
           * In my experiment, pages that doesn't have x-rayed data we collected
           * are considered as if there is no risk to display. For this reason,
           * it will be rejected although it supposed to be resolved by empty string.
           */
          reject();
        }
      };

      request.onerror = () => reject();
    };

    openReq.onerror = () => reject();
  });
}

export async function getCookieIds(table: string, pageId: string): Promise<string[]> {
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
        } else {
          /**
           * In my experiment, pages that doesn't have 3p-cookies are considered
           * as if there is no risk to display. For this reason, it will be rejected
           * although it supposed to be resolved empty array.
           */
          reject();
        }
      };

      getReq.onerror = () => reject();
    };

    openReq.onerror = () => reject();
  });
}

export async function getCookie(table: string, cookieId: string): Promise<CookieIDBTable> {
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

export async function getCookies(table: 'xrayed' | 'serp', cookieIds: string[]): Promise<CookieIDBTable[]> {
  const cookies = [];
  for (const cookieId of cookieIds) {
    const cookie = await getCookie(table, cookieId);
    cookies.push(cookie);
  }
  return cookies;
}

export async function getCookieDomain(table: string, cookieId: string): Promise<string> {
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
      const request: IDBRequest = cookieOS.get(cookieId);
      request.onsuccess = () => {
        console.log(table, cookieId, request.result);
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

export async function getCookieDomains(table: string, cookieIds: string[]): Promise<string[]> {
  const cookies = [];
  for (const cookieId of cookieIds) {
    const cookie = await getCookieDomain(table, cookieId);
    cookies.push(cookie);
  }
  return cookies;
}
