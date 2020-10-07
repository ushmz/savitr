document.getElementById('initBtn').addEventListener('click', () => {
  initialize();
});

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

  // Initialize tables
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

  // Initialize rows.
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
