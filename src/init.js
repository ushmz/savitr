document.getElementById('initBtn').addEventListener('click', () => {
  initialize(getConnection());
});

const ERRORS = {
  '0': 'UNKNOWN_ERR',
  '1': 'DATABASE_ERR',
  '2': 'VERSION_ERR',
  '3': 'TOO_LARGE_ERR',
  '4': 'QUOTA_ERR',
  '5': 'SYNTAX_ERR',
  '6': 'CONSTRAINT_ERR',
  '7': 'TIMEOUT_ERR',
}

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

function encode4SQLQuery(query) {
  return query.replace(/;[^\n]/g, '\;').replace(/[^,(\s]'[^,)\s]/g, '__quote__').replace(/\n/g, '');
}

function decode4SQLQuery(query) {
  return query.replace(/__semicolon__/g, ';').replace(/__quote__/g, '\'');
}

function logDBError(error) {
  console.log(`${ERRORS[error.code]}(code=${error.code}): ${error.message}`);
}

async function initialize(db) {
  const cookieFileUrl = chrome.runtime.getURL('db/sql/cookie_dump.sql');
  const cookieTableQueries = await getQueryFromFile(cookieFileUrl);

  const pageFileUrl = chrome.runtime.getURL('db/sql/page_dump.sql');
  const pageTableQueries = await getQueryFromFile(pageFileUrl);

  const junctionFileUrl = chrome.runtime.getURL('db/sql/page_cookie_junction_dump.sql');
  const junctionTableQueries = await getQueryFromFile(junctionFileUrl);

  // Initialize tables
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS `cookie`', []);
    tx.executeSql(CREATE_TABEL_COOKIE_QUERY, [],
      (_, __) => { },
      (_, err) => {logDBError(err)}
    );

    tx.executeSql('DROP TABLE IF EXISTS `page`', []);
    tx.executeSql(CREATE_TABEL_PAGE_QUERY, [],
      (_, __) => { },
      (_, err) => logDBError(err)
    );

    tx.executeSql('DROP TABLE IF EXISTS `page_cookie_junction`', []);
    tx.executeSql(CREATE_TABEL_PAGE_COOKIE_JUNCTION_QUERY, [],
      (_, __) => { },
      (_, err) => logDBError(err) 
    );
  });

  // Initialize rows.
  db.transaction(tx => {
    cookieTableQueries.forEach(query => {
      tx.executeSql(encode4SQLQuery(query), [],
        (_, __) => { },
        (_, err) => {
          if (err.code !== 5) {
            logDBError(err); 
          }
        }
      );
    });
    pageTableQueries.forEach(query => {
      tx.executeSql(encode4SQLQuery(query), [],
        (_, __) => { },
        (_, err) => {
          if (err.code !== 5) {
            logDBError(err);
          }
        }
      );
    });
    junctionTableQueries.forEach(query => {
      tx.executeSql(encode4SQLQuery(query), [],
        (_, __) => { },
        (_, err) => {
          if (err.code !== 5) {
            logDBError(err);
          }
        }
      );
    });
  });
}
