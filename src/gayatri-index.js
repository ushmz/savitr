(async () => {
  await collectSerp();
})();

async function collectURL() {
  // May be make this block as a function
  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  Array.from(targets).map( async (t, idx) => {
    let key = 'savitri' + Date.now().toString() + idx;
    let url = t.children[t.children.length-1].children[0].children[0].href;
    // let snippet = t.children[t.children.length-1].children[1].children[0].href
    let result = await setItem(key, url);

  });
}

async function collectSerp() {
  let rcs = document.getElementsByClassName('rc');

  Array.from(rcs).map( async (rc, idx) => {
    let key = 'savitri' + Date.now().toString() + idx;
    let url = '';
    let snippet = '';
    for (let i = 0; i< rc.children.length; i++) {
      r = rc.children.item(i);
      if (r.className === 'yuRUbf') {
        url = r.children[0].href;
      } else if (r.className === 'IsZvec') {
        console.log(r);
        snippet = r.children[0].children[0].children[1]?.innerHTML || r.children[0].children[0].children[0].innerHTML
      }
    }
    let result = await setItem(key, `${url},${snippet}`);
  }); 
}

function setItem(key, value) {
  return new Promise( resolve => {
    chrome.runtime.sendMessage({method:'set', key:key, value:value}, response => {
      resolve(response);
    })
  });
}

function clearItems() {
  return new Promise( resolve => {
    chrome.runtime.sendMessage({method:'clear'}, response => {
      resolve(response.data);
    })
  })
}
