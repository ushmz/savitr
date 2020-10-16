(async () => {
  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  db = getConnection();

  Array.from(targets).map( (t, idx) => {
    let baseURL = t.children[t.children.length-1].children[0].children[0].href;
    let contents = getCookieList(db, getNoArgsURL(baseURL));
    const panel = createPanel(idx, contents);
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
  let text = contents.map( r => r.domain ).join(',');
  let panel = document.createElement('div');
  panel.id = `annotate${suffix}`;
  panel.style.backgroundColor = '#161821';
  panel.style.width = '360px';
  panel.style.height = '240px';
  panel.style.position = 'absolute';
  panel.style.left = '640px';
  let testp = document.createElement('p');
  testp.innerText = text;
  testp.style.color = 'red';
  panel.appendChild(testp);
  return panel;
}

function getNoArgsURL(url) {
  let re = /(https?:\/\/.+)\?/;
  let matched = url.match(re);
  if (matched) {
    return matched[1];
  } else {
    return url;
  }
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
    page.id = page_cookie_junction.page_id\
  AND\
    page_cookie_junction.cookie_id = cookie.id\
  AND\
    page.start_uri = ?\
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

function ping(db) {
  if (!db) {
    db = getConnection();
  }
  return db
}

function getCookieList(db, target) {
  cookies = []
  db.transaction( tx =>{
    tx.executeSql(GET_COOKIE_LIST_QUERY, [target],
      (_, {rows}) => {
        if (rows.length > 0) {
          console.log('Found', target, rows)
          cookies = rows;
        } else {
          console.log('Error', target, 'Empty result set.');
        }
      },
      (_, err) => {console.log(err)}
    );
  });
  return cookies;
}

function getRequestedUris(db, uri) {
  db.transaction( tx =>{
    tx.executeSql(GET_REQUESTED_URIS_QUERY, [uri],
      (tx, result) => {},
      (_, err) => {}
    );
  });
}
