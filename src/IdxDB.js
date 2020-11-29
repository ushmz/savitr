import axios from 'axios';

const endpoint = 'http://localhost:8000/analyze';

async function getArgsFromFile(url) {
  let response = await fetch(url)
  let initQuery = await response.text();
  let initQueryArray = initQuery.split('\n');
  return initQueryArray;
}

function formatString2Array(arrayLikeString) {
  if (arrayLikeString){
    return arrayLikeString.slice(1, -1).split('\\,');
  } else {
    return [];
  }
}

/**
 * @typedef status
 * @property {boolean} status - Method return value is proper or not.
 * @property {Array<string>} cookies - Cookie domain list (Listed string).
 * @property {string} error - Kinds of error.
 * @property {string} message - Description of error.
 */

/**
 * Initialize user history information.
 */
export async function initializeHistory() {

  // Open database named `history`.
  const openReq = indexedDB.open('history', 1);
  
  // If database version > 1, nothing to do.
  openReq.onsuccess = () => console.log('Successfully connected.');

  // If there is an error while connecting, display it.
  openReq.onerror = () => console.log(openReq.error);

  // If table version < 1 (it means user dosen't have database)
  // Initialize database.
  openReq.onupgradeneeded = event => {
    // Get database connection object.
    const db = openReq.result;

    // Create ObjectStore(table).
    const historyStore = db.createObjectStore('history', {autoIncrement: true});
    // Create index for ObjectStore
    historyStore.createIndex('url', 'url', {unique: false});

    // When ObjectStore structure is initialized,
    // insert data into this ObjectStore. 
    historyStore.transaction.oncomplete = event => {
      // Send messageto runtime in order to get user's history
      chrome.runtime.sendMessage({method: 'history', max: 10}, async response => {
        // Get history objects from response
        const histories = response.data;

        const axiosOptions = {headers: { 'content-type': 'application/x-www-form-urlencoded' }};
        const hstrWithCookies = await axios.post(endpoint, {data: histories, ext_id: chrome.runtime.id}, axiosOptions);
        console.log('Cookies ready');

        // Start transaction with `history` ObjectStore
        const historyOS = db.transaction('history', 'readwrite').objectStore('history');
        // Add each history object to ObjectStore
        hstrWithCookies.data.forEach( history => {
          historyOS.add(history);
        });

      });
    }
    console.log('History Loaded.');
  }
}

/**
 * Initialize table with collected page data.
 */
export async function initializeTable() {
  let openReq = indexedDB.open('savitri', 1);

  // If database version > 1, nothing to do.
  openReq.onsuccess = () => console.log('Already Done.');

  // If there is an error while connecting, display it.
  openReq.onerror = () => console.log(openReq.error);
  
  // If table version < 1 (it means user dosen't have database)
  // Initialize database.
  openReq.onupgradeneeded = async event => {
  
    console.log('Initializing...');

    // Create database connection objest.
    const db = openReq.result;

    // Create ObjectStores(tables) and indexes.
    db.createObjectStore('cookie', {autoIncrement: true})
      .createIndex('domain', 'domain', {unique: false});

    db.createObjectStore('page', {autoIncrement: true})
      .createIndex('start_uri', 'start_uri', {unique: false});
    
    db.createObjectStore('page_cookie_junction', {autoIncrement: true})
      .createIndex('junction', 'page_id', {unique: false});
    console.log('Tables initialized.');

    // Get all arguments dumped from SQL.
    const cookieFileUrl = chrome.runtime.getURL('init/cookie_essential.csv');
    const cookieTableArgs = await getArgsFromFile(cookieFileUrl);
  
    const pageFileUrl = chrome.runtime.getURL('init/page_essential.csv');
    const pageTableArgs = await getArgsFromFile(pageFileUrl);
  
    const junctionFileUrl = chrome.runtime.getURL('init/pc_junction_essential.csv');
    const junctionTableArgs = await getArgsFromFile(junctionFileUrl);
    console.log('Arguments OK.');
  
    // Start data insert transaction.
    const cookieTransaction = db.transaction(['cookie', 'page', 'page_cookie_junction'], 'readwrite');
  
    // Initialize `cookie` ObjectStore data.
    const cookieOS = cookieTransaction.objectStore('cookie');
    cookieTableArgs.forEach( argLine => {
      let args = argLine.split(',');
      let request = cookieOS.add({
        domain: args[1],
        httponly: args[2],
        secure: args[3]
      });
      request.onsuccess =  () => {};
      request.onerror = () => {
        console.log(request.error);
      };
    });
    
    // Initialize `page` ObjectStore data.
    const pageOS = cookieTransaction.objectStore('page');
    pageTableArgs.forEach( argLine => {
      let args = argLine.split(/([^\\]),/);
      let request = pageOS.add({
        id: args[0] + args[1],
        title: args[2] + args[3],
        start_uri: args[4] + args[5],
        final_uri: args[6] + args[7],
        requested_uris: formatString2Array(args[8] + args[9]),
        recieved_uris: formatString2Array(args[10] + args[11])
      });
      request.onsuccess =  () => {};
      request.onerror = () => {
        console.log(request.error);
      };
    });
  
    // Initialize `page_cookie_junction` ObjectStore data.
    const pcjunctionOS = cookieTransaction.objectStore('page_cookie_junction');
    junctionTableArgs.forEach( argLine => {
      let args = argLine.split(',');
      let request = pcjunctionOS.add({
        page_id: args[0],
        cookie_id: args[1]
      });
      request.onsuccess =  () => {};
      request.onerror = () => {
        console.log(request.error);
      };
    });
    
    // Transaction will be closed automatically.
    console.log('Initialize Done.')
  }  
  return true;
}

// TODO: Refresh history ObjectStore with latest histories.
async function refreshHistories() {

}

/**
 * Get pageID from colected pages data.
 * 
 * @param {string} target - Page URI 
 * @return {Promise<string|status>} pageID - PageID
 */
export async function getPageId(target) {
  return new Promise( (resolve, reject) => {
    const openReq = indexedDB.open('savitri', 1);
    
    openReq.onupgradeneeded = () => {
      alert('はじめに，initializeを行ってください．')
    }

    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction('page', 'readonly');

      const pageOS = tx.objectStore('page');
      const pageIndex = pageOS.index('start_uri');
      const request = pageIndex.get(target);
      request.onsuccess = event => {
        if(request.result !== undefined) {
          let page = request.result;
          resolve(page.id);
        } else {
          reject({status: true, cookies: [], error: 'NOT_COLLECTED', message: 'This page data not collected.'});
        }
      }
      request.onerror = event => {
        reject({status: false, cookies: [], error:'DB_QUERY_ERROR', message: 'There is an error in page table.'});
      }
    }
    openReq.onerror = () => {
      reject({status: false, cookies: [], error:'DB_CONNECTION_ERROR', message: 'There is an error while connecting page table.'});
    }
  });
}

/**
 * Get IDs of cookie(domain) that given page contain
 * @param {string} pageId - Oage ID get from `getPageId`
 * @return {Promise<Array<string>|status>} - Listed cookie Id or (error) status object
 */
export async function getCookieIds(pageId) {
  return new Promise( (resolve, reject) => {
    if(!pageId) reject();
    const openReq = indexedDB.open('savitri', 1);
  
    openReq.onupgradeneeded = () => {
      alert('はじめに，initializeを行ってください．')
    }
  
    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction('page_cookie_junction', 'readonly');
  
      const junctionOS = tx.objectStore('page_cookie_junction');
      const junctionIndex = junctionOS.index('junction');
      const getReq = junctionIndex.getAll(pageId);
      getReq.onsuccess = () => {
        if(getReq.result.length > 0) {
          let junctions = getReq.result;
          resolve(junctions.map(junction => junction.cookie_id));
        } else {
          reject({status: true, cookies: [], error:'NO_COOKIE_DETECTED', message: 'No cookie detected.'});
        }
      }
      getReq.onerror = () => {
        reject({status: false, cookies: [], error:'DB_QUERY_ERROR', message: 'There is an error in junction table.'});
      }
    }
    openReq.onerror = () => {
      reject({status: false, cookies: [], error:'DB_CONNECTION_ERROR', message: 'There is an error while connecting junction table.'});
    }
  });
}

/**
 * 
 * @typedef cookie
 * @property {string} domain - Domain that generate the cookie
 * @property {string} httponly - "1" means true, "0" means false
 * @property {string} secure - "1" means true, "0" means false
 */

/**
 * Get cookie information from collected data
 * 
 * @param {Array<string>} cookieIds - Listed string of cookie ID
 * @return {Promise<Array<cookie>>} cookies - Listed cookie informarion 
 */
export async function getCookies(cookieIds) {
  const cookies = [];
  for (const cookieId of cookieIds) {
    const cookie = await getCookie(cookieId);
    cookies.push(cookie);
  }
  // const cookieList = await cookieIds.map( async (cookieId) => {
  //   const cookie = await getCookie(cookieId);
  //   console.log(cookie);
  //   return cookie;
  // });
  return cookies
}

/**
 * Get cookie information of given cookie ID 
 * @param {string} cookieId - Get from `getCookieID()`
 * @return {Promise<cookie|status>} - Cookie information object or (error) status object
 */
export async function getCookie(cookieId) {
  return new Promise( (resolve, reject) => {
    if(!cookieId) reject();
    const openReq = indexedDB.open('savitri', 1);
  
    openReq.onupgradeneeded = () => {
      alert('はじめに，initializeを行ってください．')
    }
  
    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction('cookie', 'readonly');

      const cookieOS = tx.objectStore('cookie');
      const request = cookieOS.get(parseInt(cookieId));
      request.onsuccess = () => {
        resolve(request.result);
      }
      request.onerror = () => {
        reject({status: false, cookies: [], error:'DB_QUERY_ERROR', message: 'There is an error in cookie table.'});
      };
    }
    
    openReq.onerror = () => {
      reject({status: false, cookies: [], error:'DB_CONNECTION_ERROR', message: 'There is an error while connecting cookie table.'});
    }
  });
}

// window.getPageId = getPageId;
// window.getCookieIds = getCookieIds;
// window.getCookies = getCookies;
