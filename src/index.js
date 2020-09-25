(async () => {
  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  Array.from(targets).map( (t, idx) => {
    let baseURL = t.children[t.children.length-1].children[0].children[0].href;
    // let content = getCookieList(getDomain(baseURL));
    const panel = createPanel(idx, baseURL);
    t.addEventListener('mouseover', (eve) => {
      t.parentNode.insertBefore(panel, t);
      // eve.target.style.background='#161821';
      // setTimeout(() => {eve.target.style.background=''}, 500);
    });
    t.addEventListener('mouseleave', (eve) => {
      setTimeout( () => {
        let pnl = document.getElementById(`annotate${idx}`);
        pnl.remove();
      }, 500);
    });
  });
})();

function createPanel(suffix, contents) {
  let panel = document.createElement('div');
  panel.id = `annotate${suffix}`;
  panel.style.backgroundColor = '#161821';
  panel.style.width = '360px';
  panel.style.height = '240px';
  panel.style.position = 'absolute';
  panel.style.left = '640px';
  let testp = document.createElement('p');
  testp.innerText = contents;
  testp.style.color = 'red';
  panel.appendChild(testp);
  return panel;
}

function getDomain(url) {
  let re = /https?:\/\/[^\/]+\//;
  let matched = url.match(re);
  console.log(matched);
  return url;
}

function collectURL() {
  // May be make this block as a function
  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  const linkEntries = Array.from(targets).map( (t, idx) => {
    let k = 'savitri' + Date.now().toString() + idx;
    let v = t.children[t.children.length-1].children[0].children[0].href
    console.log(`collected: ${v}`);
    localStorage.setItem(k, v);
    return [`link${idx}`, v];
  });
  return Object.fromEntries(linkEntries);
}

/**
 * Database functions
 * 
 * tx.executeSql -> Error Code
 *  UNKNOWN_ERR: 0
 *  DATABASE_ERR: 1
 *  VERSION_ERR: 2
 *  TOO_LARGE_ERR: 3
 *  QUOTA_ERR: 4
 *  SYNTAX_ERR: 5
 *  CONSTRAINT_ERR: 6
 *  TIMEOUT_ERR: 7
 */
const CREATE_TABEL_COOKIE_QUERY = '\
CREATE TABLE `cookie` (\
  `id` INTEGER,\
  `name` TEXT,\
  `secure` TEXT,\
  `path` TEXT,\
  `domain` TEXT,\
  `expires` TEXT,\
  `httponly` TEXT,\
  `expiry` TEXT,\
  `value` TEXT,\
  `captured` TEXT,\
  `domain_id` INTEGER,\
  PRIMARY KEY(`id`)\
)'

const CREATE_TABEL_PAGE_QUERY = '\
CREATE TABLE `page` (\
  `id` INTEGER,\
  `time_series_num` INTEGER,\
  `title` TEXT,\
  `meta_desc` TEXT,\
  `start_uri_md5` TEXT,\
  `start_uri` TEXT,\
  `start_uri_no_args` TEXT,\
  `start_uri_args` TEXT,\
  `final_uri_md5` TEXT,\
  `final_uri` TEXT,\
  `final_uri_no_args` TEXT,\
  `final_uri_args` TEXT,\
  `source` TEXT,\
  `requested_uris` TEXT,\
  `received_uris` TEXT,\
  `domain_id` INTEGER,\
  `accessed` TEXT,\
  PRIMARY KEY(`id`)\
)'

const CREATE_TABEL_PAGE_COOKIE_JUNCTION_QUERY = '\
CREATE TABLE `page_cookie_junction` (\
  `page_id` INTEGER,\
  `cookie_id` INTEGER,\
  PRIMARY KEY(`page_id`, `cookie_id`)\
)'

const GET_COOKIE_LIST_QUERY = '\
  SELECT\
    domain,\
    httponly,\
    secure\
  FROM\
    cookie,\
    page_cookie_junction,\
    page\
  WHERE\
    page.final_uri_no_args = ?\
  AND\
    page.id = page_cookie_junction.page_id\
  AND\
    page_cookie_junction.cookie_id = cookie.id\
'

const GET_REQUESTED_URIS_QUERY ='\
  SELECT\
    requested_uris\
  FROM\
    page\
  WHERE\
    page.final_uri_no_args = ?\
'

// name, version, description, size
function getConnection() {
  return openDatabase(
    'savitri',
    '1.0',
    'DB for savitri',
    1024 * 1024
  );
}

async function getQueryFromFile(url) {
  let response = await fetch(url)
  let initQuery = await response.text();
  let initQueryArray = initQuery.split('\n');
  return initQueryArray;
}

async function initialize(db) {
  const cookieFileUrl = chrome.runtime.getURL('db/sql/cookie_dump.sql');
  const cookieTableQueries = await getQueryFromFile(cookieFileUrl);

  const pageFileUrl = chrome.runtime.getURL('db/sql/page_dump.sql');
  const pageTableQueries = await getQueryFromFile(pageFileUrl);

  const junctionFileUrl = chrome.runtime.getURL('db/sql/page_cookie_junction_dump.sql');
  const junctionTableQueries = await getQueryFromFile(junctionFileUrl);

  await db.transaction( tx =>{
    tx.executeSql('DROP TABLE IF EXISTS `cookie`', []);
    tx.executeSql(CREATE_TABEL_COOKIE_QUERY, [],
      (_, __) => {},
      (_, err) => console.log('Error: ', err.message)
    );

    tx.executeSql('DROP TABLE IF EXISTS `page`', []);
    tx.executeSql(CREATE_TABEL_PAGE_QUERY, [],
      (_, __) => {},
      (_, err) => console.log('Error: ', err.message)
    );

    tx.executeSql('DROP TABLE IF EXISTS `page_cookie_junction`', []);
    tx.executeSql(CREATE_TABEL_PAGE_COOKIE_JUNCTION_QUERY, [],
      (_, __) => {},
      (_, err) => console.log('Error: ', err.message)
    );
  });
  
  await db.transaction( tx => {
    cookieTableQueries.forEach(query => {
      tx.executeSql(encode4SQLQuery(query), [],
        (_, __) => {},
        (_, err) => {
          if (err.code !== 5) {
            console.log('Error: ', err.message);
          }
        }
      );
    });
    pageTableQueries.forEach(query => {
      tx.executeSql(encode4SQLQuery(query), [],
        (_, __) => {},
        (_, err) => {
          if (err.code !== 5) {
            console.log('Error: ', err.message);
          }
        }
      );
    });
    junctionTableQueries.forEach(query => {
      tx.executeSql(encode4SQLQuery(query), [],
        (_, __) => {},
        (_, err) => {
          if (err.code !== 5) {
            console.log('Error: ', err.message);
          }
        }
      );
    });
  });
}

// function getCookieList(db, uri) {
//   db.transaction( tx =>{
//     tx.executeSql(GET_COOKIE_LIST_QUERY)
//   });
// }

// function getRequestedUris(db, uri) {
//   db.transaction( tx =>{
//     tx.executeSql(GET_REQUESTED_URIS_QUERY)
//   });
// }

function encode4SQLQuery(query) {
  return query.replace(/;[^\n]/g, '\;').replace(/[^,(\s]'[^,)\s]/g, '__quote__').replace(/\n/g, '');
}

function decode4SQLQuery(query) {
  return query.replace(/__semicolon__/g, ';').replace(/__quote__/g, '\'');
}