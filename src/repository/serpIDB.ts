/* eslint-disable @typescript-eslint/camelcase */
import { SerpPageTable } from '../shared/types';
import { getLinesFromFile } from '../shared/util';

export async function initializeSearchResults(): Promise<void> {
  return new Promise((resolve, reject) => {
    const openReq: IDBOpenDBRequest = indexedDB.open('serp', 1);

    openReq.onupgradeneeded = async () => {
      const db = openReq.result;
      db.createObjectStore('cookie', { autoIncrement: true }).createIndex('domain', 'domain', { unique: false });
      db.createObjectStore('page', { autoIncrement: true }).createIndex('start_uri', 'start_uri', { unique: false });
      db.createObjectStore('junction', { autoIncrement: true }).createIndex('junction', 'page_id', { unique: false });
      console.log('SERP Table Initialized.');
    };

    openReq.onsuccess = async () => {
      const db = openReq.result;

      const cookieFileUrl = chrome.runtime.getURL('init/serp/cookie_essential.csv');
      const serpCookieArgs: string[] = await getLinesFromFile(cookieFileUrl);

      const pageFileUrl = chrome.runtime.getURL('init/serp/page_essential.csv');
      const serpPageArgs: string[] = await getLinesFromFile(pageFileUrl);

      const junctionFileUrl = chrome.runtime.getURL('init/serp/pc_junction_essential.csv');
      const serpJunctionArgs: string[] = await getLinesFromFile(junctionFileUrl);

      const tx: IDBTransaction = db.transaction(['cookie', 'page', 'junction'], 'readwrite');

      const cookieOS: IDBObjectStore = tx.objectStore('cookie');
      cookieOS.clear();

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

      const pageOS: IDBObjectStore = tx.objectStore('page');
      pageOS.clear();

      serpPageArgs.forEach((argLine) => {
        const args: string[] = argLine.split(',');
        const request: IDBRequest = pageOS.add({
          id: args[0],
          title: args[1],
          start_uri: args[2],
          final_uri: args[3],
          snippet: args[4],
        });

        request.onerror = () => {
          console.log(request.error);
        };
      });

      const pcjunctionOS: IDBObjectStore = tx.objectStore('junction');
      pcjunctionOS.clear();

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

export async function getAllPage(): Promise<SerpPageTable[]> {
  return new Promise((resolve, reject) => {
    const openReq = indexedDB.open('serp', 1);
    openReq.onsuccess = () => {
      const db: IDBDatabase = openReq.result;
      const tx: IDBTransaction = db.transaction('page', 'readonly');

      const pagesOS: IDBObjectStore = tx.objectStore('page');
      const request: IDBRequest = pagesOS.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
    };
    openReq.onerror = () => reject();
  });
}

export async function getResultRanged(page: number): Promise<SerpPageTable[]> {
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
