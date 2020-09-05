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
      }, 500)
    });
  });
 
  let param = collectURL();

  async function writeFile(fileHandle, contents) {
    const writable = await fileHandle.createWritable();
    //await writer.truncate(0);
    await writable.write(contents);
    await writable.close();
  }

  const saveFileOptions = {
    type: 'save-file',
    accepts: [{
      description: 'Json file',
      mimeTypes: ['application/json'],
      extentions: ['json']
    }]
  };

  async function exportAll() {
    const handle = await window.chooseFileSystemEntries(saveFileOptions);
    let content = '';
  
    for (let i = 0; i < localStorage.length; i++) {
      let k = localStorage.key(i);
      if (k.match(/savitri/)) {
        let v = localStorage.getItem(k);
        console.log(`${k}: ${v}`);
        content += `    "${k}": "${v}",\n`;
      }
    }
    console.log(content);
    await writeFile(handle, `{\n${content.slice(0, -1)}\n}`);
  };

  exportAll();

})();

function createPanel(suffix, contents) {
  let panel = document.createElement('div');
  panel.id = `annotate${suffix}`;
  panel.style.backgroundColor = '#161821';
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
