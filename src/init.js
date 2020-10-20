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
  `domain` TEXT,\
  `httponly` TEXT,\
  `secure` INTEGER\
);'

const CREATE_TABEL_PAGE_QUERY = '\
CREATE TABLE `page` (\
  `id` INTEGER,\
  `title` TEXT,\
  `start_uri_no_args` TEXT,\
  `final_uri_no_args` TEXT,\
  `requested_uris` TEXT,\
  `received_uris` TEXT\
);'

const CREATE_TABEL_PAGE_COOKIE_JUNCTION_QUERY = '\
CREATE TABLE `page_cookie_junction` (\
  `page_id` INTEGER,\
  `cookie_id` INTEGER\
);'

const COOKIE_INSERT_QUERY = 'INSERT INTO cookie(id, domain, httponly, secure) values(?,?,?,?)';
const PAGE_INSERT_QUERY = 'INSERT INTO `page` values(?,?,?,?,?,?)';
const PC_JUNCTION_INSERT_QUERY = 'INSERT INTO `page_cookie_junction` values(?,?)';

// name, version, description, size
function getConnection() {
  return openDatabase(
    'savitri',
    '1.0',
    'DB for savitri',
    1024 * 1024
  );
}

async function getArgsFromFile(url) {
  let response = await fetch(url)
  let initQuery = await response.text();
  let initQueryArray = initQuery.split('\n');
  console.log(initQueryArray);
  return initQueryArray;
}

function encode4SQLQuery(query) {
  if (query.search(/([^,\(\s\\])([\[\];])([^,\)\s])/) != -1) {
    return query.replace(/([^,\(\s\\])([\[\];])([^,\)\s])/g, /$1\$2$3/).replace(/\n/g, '');
  } else {
    return query.replace(/\n/g, '')
  }
}

function decode4SQLQuery(query) {
  return query.replace(/__semicolon__/g, ';').replace(/__quote__/g, '\'');
}

function logDBError(line, error) {
  console.log(`${ERRORS[error.code]}(code=${error.code}): ${error.message} at line${line}`);
}

async function initialize(db) {
  console.log('Initializing...');
  const cookieFileUrl = chrome.runtime.getURL('init/cookie_essential.csv');
  const cookieTableArgs = await getArgsFromFile(cookieFileUrl);

  const pageFileUrl = chrome.runtime.getURL('init/page_essential.csv');
  const pageTableArgs = await getArgsFromFile(pageFileUrl);

  const junctionFileUrl = chrome.runtime.getURL('init/pc_junction_essential.csv');
  const junctionTableArgs = await getArgsFromFile(junctionFileUrl);
  console.log('Queries OK.');

  // Initialize tables
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS `cookie`', []);
    tx.executeSql(CREATE_TABEL_COOKIE_QUERY, [],
      (_, __) => { console.log('`cookie` table initialized.') },
      (_, err) => {
        logDBError('95', err);
      }
    );

    // tx.executeSql('DROP TABLE IF EXISTS `page`', []);
    // tx.executeSql(CREATE_TABEL_PAGE_QUERY, [],
    //   (_, __) => { console.log('`page` table initialized.')},
    //   (_, err) => {
    //     logDBError('103', err);
    //   } 
    // );

    // tx.executeSql('DROP TABLE IF EXISTS `page_cookie_junction`', []);
    // tx.executeSql(CREATE_TABEL_PAGE_COOKIE_JUNCTION_QUERY, [],
    //   (_, __) => { console.log('`junction` table initialized.') },
    //   (_, err) => {
    //     logDBError('111', err);
    //   }
    // );
  });

  // Initialize rows.
  db.transaction(tx => {
    cookieTableArgs.forEach(args => {
      tx.executeSql(COOKIE_INSERT_QUERY, args.split(','),
        (_, __) => { },
        (_, err) => {
          if (err.code !== 15) {
            logDBError('123', err); 
          }
        }
      );
    });
    pageTableArgs.forEach(args => {
      tx.executeSql(PAGE_INSERT_QUERY, args.split(/[^\\],/),
        (_, __) => { },
        (_, err) => {
          if (err.code !== 15) {
            logDBError('133', err);
          }
        }
      );
    });
    junctionTableArgs.forEach(args => {
      tx.executeSql(PC_JUNCTION_INSERT_QUERY, args.split(','),
        (_, __) => { },
        (_, err) => {
          if (err.code !== 15) {
            logDBError('143', err);
          }
        }
      );
    });
  });
  console.log('Rows initialize done');
}
