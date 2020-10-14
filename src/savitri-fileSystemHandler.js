(async () => {
  document.getElementById('history').addEventListener('click', async () => {

    chrome.runtime.sendMessage({method: 'history', max: 1000}, async res => {
      if (res.status) {
        console.log(Object.values(res.data));
        await export2File(JSON.stringify(res.data));
      } else {
        console.log('Invalid method.');
      }
    });
  
  });
})();

async function export2File(data) {
  const options = {
    types: [
      {
        description: 'Json Files',
        accept: {
          'text/plain': ['.json'],
        },
      },
    ],
  };
  const handle = await window.showSaveFilePicker(options);
  await writeFile(handle, data);
};

async function writeFile(fileHandle, contents) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
