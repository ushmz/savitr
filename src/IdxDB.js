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
    return '';
  }
}

async function initialize() {
  let openReq = indexedDB.open('savitri', 1);
  
  openReq.onupgradeneeded = async event => {
    // When client DB version < 1 (= client doesn't have DB)
    // Initialize DB
    console.log('Initializing...');
    // Create Object store
    const db = openReq.result;
    // const db_event = event.target.result;
    db.createObjectStore('cookie', {autoIncrement: true})
      .createIndex('domain', 'domain', {unique: false});
    db.createObjectStore('page', {autoIncrement: true})
      .createIndex('start_uri', 'start_uri', {unique: false});
    db.createObjectStore('page_cookie_junction', {autoIncrement: true})
      .createIndex('junction', 'page_id', {unique: false});
  
    // Get all arguments dumped from SQL
    const cookieFileUrl = chrome.runtime.getURL('init/cookie_essential.csv');
    const cookieTableArgs = await getArgsFromFile(cookieFileUrl);
  
    const pageFileUrl = chrome.runtime.getURL('init/page_essential.csv');
    const pageTableArgs = await getArgsFromFile(pageFileUrl);
  
    const junctionFileUrl = chrome.runtime.getURL('init/pc_junction_essential.csv');
    const junctionTableArgs = await getArgsFromFile(junctionFileUrl);
    console.log('Arguments OK.');
    
  
    // Start transaction
    const cookieTransaction = db.transaction(['cookie', 'page', 'page_cookie_junction'], 'readwrite');
  
    // Initialize `cookie` Object store data.
    const cookieOS = cookieTransaction.objectStore('cookie');
    cookieTableArgs.forEach( argLine => {
      let args = argLine.split(',');
      let request = cookieOS.add({
        domain: args[1],
        httponly: args[2],
        secure: args[3]
      });
      request.onsuccess =  () => {
        // console.log(request.result);
      };
      request.onerror = () => {
        console.log(request.error);
      };
    });
    
    // Initialize `page` Object store data.
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
      request.onsuccess =  () => {
        // console.log(request.result);
      };
      request.onerror = () => {
        console.log(request.error);
      };
    });
  
    // Initialize `page_cookie_junction` Object store data.
    const pcjunctionOS = cookieTransaction.objectStore('page_cookie_junction');
    junctionTableArgs.forEach( argLine => {
      let args = argLine.split(',');
      let request = pcjunctionOS.add({
        page_id: args[0],
        cookie_id: args[1]
      });
      request.onsuccess =  () => {
        // console.log(request.result);
      };
      request.onerror = () => {
        console.log(request.error);
      };
    });
    // Transaction will be closed automatically.
    console.log('Initialize Done.')
  }
  
  openReq.onsuccess = () => {
    console.log('Already Done.')
  }
  return true;
}

async function getPageId(target) {
  /**
   * Args:
   *  target(string)  : Target page URI
   * Return:
   *  pageId(string)  : Target Page Id
   */
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
          reject({status: true, cookies: ['not collected'], msg: 'This page data not collected.'});
        }
      }
      request.onerror = event => {
        reject({status: false, cookies: [], msg: 'There is an error in page table.'});
      }
    }
    openReq.onerror = () => {
      reject({status: false, cookies: [], msg: 'There is an error while connecting page table.'});
    }
  });
}

async function getCookieIds(pageId) {
  /**
   * Args:
   *  pageId(string)            : Target page Id
   * Return:
   *  cookieIds(Arrsy<string>)  : Array of cookieId that target page contain
   */
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
          reject({status: true, cookies: ['no cookie detected'], msg: 'No cookies detected.'});
        }
      }
      getReq.onerror = () => {
        reject({status: false, cookies: [], msg: 'There is an error in junction table.'});
      }
    }
    openReq.onerror = () => {
      reject({status: false, cookies: [], msg: 'There is an error while connecting junction table.'});
    }
  });
}

async function getCookies(cookieIdArray) {
  /**
   * Args:
   *  cookieIds(Array<string>)  : Array of cookieId
   * Return:
   *  cookies(Arrsy<object>)    : Array of cookie
   */
  return new Promise( (resolve, reject) => {
    if(!cookieIdArray) reject();
    const openReq = indexedDB.open('savitri', 1);
  
    openReq.onupgradeneeded = () => {
      alert('はじめに，initializeを行ってください．')
    }
  
    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction('cookie', 'readonly');

      const cookieOS = tx.objectStore('cookie');
      let cookies = cookieIdArray.map( cookieId => {
        const request = cookieOS.get(cookieId);
        request.onsuccess = async () => {
          let cookie = await request.result;
          return cookie;
        }
        request.onerror = () => {
          reject({status: false, cookies: [], msg: 'There is an error in cookie table.'});
        };
      });
      resolve(cookies);
    }
    
    openReq.onerror = () => {
      reject({status: false, cookies: [], msg: 'There is an error while connecting cookie table.'});
    }
  });
}

async function getPageIdDexie(target) {
  let db = new Dexie('savitri');
  let page = await db.table('page').get(1);
  return page;
}