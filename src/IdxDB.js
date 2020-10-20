document.getElementById('initBtn').addEventListener('click', async () => {
  await initialize();  
})

async function initialize() {
  let openReq = indexedDB.open('savitri', 1);
  
  openReq.onupgradeneeded = async () => {
    // When client DB version < 1 (= client doesn't have DB)
    // Initialize DB
    console.log('Initializing...');
    // Create Object store
    const db = openReq.result;
    db.createObjectStore('cookie', {autoIncrement: true});
    db.createObjectStore('page', {autoIncrement: true});
    db.createObjectStore('page_cookie_junction', {autoIncrement: true});
  
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
        title: args[2]+args[3],
        start_uri_no_args: args[4]+args[5],
        final_uri_no_args: args[6] + args[7],
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
  }
  
  openReq.onsuccess = () => {
    console.log('Already Done.')
  }
}

function formatString2Array(arrayLikeString) {
  if (arrayLikeString){
    return arrayLikeString.slice(1, -1).split('\\,');
  } else {
    return '';
  }
}

async function getArgsFromFile(url) {
  let response = await fetch(url)
  let initQuery = await response.text();
  let initQueryArray = initQuery.split('\n');
  return initQueryArray;
}
