(async () => {
  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  Array.from(targets).map( (t, idx) => {
    let cont = t.children[t.children.length-1].children[0].children[0].href;
    const panel = createPanel(idx, cont);
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
