import { SERPElement } from 'shared/types';

/* eslint-disable @typescript-eslint/camelcase */
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

export async function initializeSearchResults(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const cookieFileUrl = chrome.runtime.getURL('init/serp/cookie_essential.csv');
    const serpCookieArgs: string[] = await getLinesFromFile(cookieFileUrl);

    const pageFileUrl = chrome.runtime.getURL('init/serp/page_essential.csv');
    const serpPageArgs: string[] = await getLinesFromFile(pageFileUrl);

    const junctionFileUrl = chrome.runtime.getURL('init/serp/pc_junction_essential.csv');
    const serpJunctionArgs: string[] = await getLinesFromFile(junctionFileUrl);

    const openReq: IDBOpenDBRequest = indexedDB.open('serp', 1);
    openReq.onupgradeneeded = () => {
      const db = openReq.result;
      db.createObjectStore('cookie', { autoIncrement: true }).createIndex('domain', 'domain', { unique: false });
      db.createObjectStore('page', { autoIncrement: true }).createIndex('start_uri', 'start_uri', { unique: false });
      db.createObjectStore('page_cookie_junction', { autoIncrement: true }).createIndex('junction', 'page_id', {
        unique: false,
      });

      const cookieTransaction: IDBTransaction = db.transaction(['cookie', 'page', 'page_cookie_junction'], 'readwrite');

      const cookieOS: IDBObjectStore = cookieTransaction.objectStore('cookie');
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

      const pageOS: IDBObjectStore = cookieTransaction.objectStore('page');
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

      const pcjunctionOS: IDBObjectStore = cookieTransaction.objectStore('page_cookie_junction');
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
      resolve();
    };

    openReq.onerror = () => reject();
  });
}

export function getResultRanged(page: number): SERPElement[] {
  const openReq = indexedDB.open('serp', 1);
  openReq.onsuccess = () => {
    const db: IDBDatabase = openReq.result;
    const tx: IDBTransaction = db.transaction('pages', 'readonly');

    const pagesOS: IDBObjectStore = tx.objectStore('pages');
    // Perahps, it needs casting to string
    const range = IDBKeyRange.bound(page * 10, (page + 1) * 10, false, true);
    const request: IDBRequest = pagesOS.getAll(range);
    request.onsuccess = () => {
      return request.result;
    };
  };
  return [];
}
