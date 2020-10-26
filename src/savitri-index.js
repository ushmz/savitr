(async () => {

  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  Array.from(targets).map( (t, idx) => {
    try{
      let baseURL = t.children[t.children.length-1].children[0].children[0].href;
      if (baseURL) {
        // let contents = getCookieList(db, getNoArgsURL(baseURL));
        const panel = createPanel(idx, '');
        t.parentNode.insertBefore(panel, t);
        t.addEventListener('mouseover', (eve) => {
          let pnl = document.getElementById(`annotate${idx}`);
          pnl.style.visibility = 'visible'
        });
        t.addEventListener('mouseleave', (eve) => {
          setTimeout( () => {
            let pnl = document.getElementById(`annotate${idx}`);
            pnl.style.visibility = 'hidden';
          }, 500);
        });
        chrome.runtime.sendMessage({method: 'getPageId', target: getNoArgsURL(baseURL), annotateId: `annotate${idx}`});
      }
    } catch(e) {
      console.log(e);
    }
    
  });
  chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    let cookies = document.createElement('p');
    if(message.status) {
      cookies.innerHTML = message.cookies.join(',');
    } else {
      cookies.innerHTML = 'error occurred'
    }
    cookies.style.color = 'white';
    console.log('Recieve', message.annotateId, message.status, message.cookies)
    document.getElementById(message.annotateId).appendChild(cookies);
    return true;
  });
})();

function createPanel(suffix, contents) {
  // let text = contents.map( r => r.domain ).join(',');
  let panel = document.createElement('div');
  panel.id = `annotate${suffix}`;
  panel.style.backgroundColor = '#161821';
  panel.style.width = '360px';
  panel.style.height = '240px';
  panel.style.position = 'absolute';
  panel.style.left = '640px';
  panel.style.visibility = 'hidden';
  // let testp = document.createElement('p');
  // testp.innerText = text;
  // testp.style.color = 'red';
  // panel.appendChild(testp);
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
    // console.log(`collected: ${v}`);
    localStorage.setItem(k, v);
    return [`link${idx}`, v];
  });
  return Object.fromEntries(linkEntries);
}
