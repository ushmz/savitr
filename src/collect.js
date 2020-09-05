(async () => {
  await collectURL();
})();

async function collectURL() {
  // May be make this block as a function
  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  Array.from(targets).map( async (t, idx) => {
    let key = 'savitri' + Date.now().toString() + idx;
    let value = t.children[t.children.length-1].children[0].children[0].href;
    let result = await setItem(key, value);
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
