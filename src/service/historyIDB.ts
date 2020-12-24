import { getHistoriesAsync } from './getAllHistory';
import { getPageId, getCookieIds, getCookies } from './indexedDB';

/**
 * Initialize user history information.
 */
export async function initializeHistory(): Promise<void> {
  return new Promise((resolve, reject) => {
    const openReq: IDBOpenDBRequest = indexedDB.open('history', 1);

    // If table version < 1 (it means user dosen't have database)
    // Initialize database.
    openReq.onupgradeneeded = () => {
      // Get database connection object.
      const db: IDBDatabase = openReq.result;

      const historyStore: IDBObjectStore = db.createObjectStore('history', { autoIncrement: true });
      historyStore.createIndex('url', 'url', { unique: false });

      historyStore.transaction.oncomplete = async () => {
        const histories = await getHistoriesAsync();

        histories.forEach(async (history: chrome.history.HistoryItem) => {
          try {
            const pageid = await getPageId(history.url || '');
            const cookieids = await getCookieIds(pageid);
            const cookies = await getCookies(cookieids);

            const historyData: object = {
              title: history.title,
              url: history.url,
              cookies: cookies,
            };
            const historyOS: IDBObjectStore = db.transaction('history', 'readwrite').objectStore('history');
            historyOS.add(historyData);
          } catch (error) {
            // Do nothing intentionally. (Pass the URL)
          }
        });

        // // TODO
        // // Callback of `sendMessage` seems not to wait until it finish.
        // // Why not using `tabs.sendMessage`?
        // chrome.runtime.sendMessage(
        //   { method: 'history', query: { max: 1000 } },
        //   async (response: RuntimeMessageResponse<ChromeHistoryResponse>) => {
        //     const histories = response.data;

        //     histories.forEach(async (history: ChromeHistoryResponse) => {
        //       try {
        //         const pageid = await getPageId(history.url);
        //         console.log('pageid: ', pageid);
        //         const cookieids = await getCookieIds(pageid);
        //         console.log('cookieids: ', cookieids);
        //         const cookies = await getCookies(cookieids);
        //         console.log('cookies: ', cookies);

        //         const historyData: object = {
        //           title: history.title,
        //           url: history.url,
        //           cookies: cookies,
        //         };
        //         const historyOS: IDBObjectStore = db.transaction('history', 'readwrite').objectStore('history');
        //         historyOS.add(historyData);
        //       } catch (error) {
        //         // Do nothing intentionally. (Pass the URL)
        //         console.log('===== NO DATA =====');
        //         console.log(error);
        //       }
        //     });
        //   },
        // );
      };
      console.log('History Loaded.');
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
export async function getCollectedHistory(domains: string[]) {
  const collected = [];
  const openReq = indexedDB.open('history', 1);
  openReq.onsuccess = () => {
    const db = openReq.result;
    const tx = db.transaction('history', 'readwrite');
    const historyOS = tx.objectStore('history');
    const historyCursol = historyOS.openCursor();
    historyCursol.onsuccess = () => {
      const row = historyCursol.result;
      if (row) {
        const cookies = row.value.cookies;
        const product = cookies.filter((domain: string) => {
          return domains.indexOf(domain) !== -1;
        });
        if (product) {
          collected.push(row.value);
        }
        row.continue;
      }
    };
  };
}
