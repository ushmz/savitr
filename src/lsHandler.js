( async () => {
  document.getElementById('clearBtn').addEventListener('click', () => {
    clearLocaStorage();
  });
  document.getElementById('exportBtn').addEventListener('click', async () => {
    await exportAll();
  });
})();

function clearLocaStorage() {
  chrome.runtime.sendMessage({method: 'clear'}, (response) => {
    console.log(response.data);
  });
  alert('Clear LocalStorage');
}

async function exportAll() {
  const saveFileOptions = {
    type: 'save-file',
    accepts: [{
      description: 'Text file',
      mimeTypes: ['application/json'],
      extentions: ['json']
    }]
  };
  
  const handle = await window.showSaveFilePicker(saveFileOptions);
  let content = '';
  let length = await getLength();

  for (let i = 0; i < length; i++) {
    let key = await getItemKey(i);
    if (key.match(/savitri/)) {
      let value = await getItemValue(key);
      content += `    "${key}": "${value}",\n`;
    }
  }
  console.log(content);
  await writeFile(handle, `{\n${content.slice(0, -2)}\n}`);
};

async function writeFile(fileHandle, contents) {
  const writable = await fileHandle.createWritable();
  //await writer.truncate(0);
  await writable.write(contents);
  await writable.close();
}

function getLength() {
  return new Promise( resolve => {
    chrome.runtime.sendMessage({method: 'length'}, response => {
      resolve(response.data);
    });
  });
}

function getItemKey(num) {
  return new Promise( resolve => {
    chrome.runtime.sendMessage( {method:'key', number: num}, response => {
      resolve(response.data);
    });
  })
}

function getItemValue(key) {
  return new Promise( resolve => {
    chrome.runtime.sendMessage( {method:'get', key: key}, response => {
      resolve(response.data);
    });
  });
}
