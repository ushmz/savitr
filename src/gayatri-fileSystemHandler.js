/**
 * @typedef history
 * @property {number} id - History ID
 * @property {float} lasrVisitTime - Unix time last visited
 * @property {string} title - Page title
 * @property {number} typedCount - Number of user type this in URL bar
 * @property {string} url - Page URL
 * @property {int} visitCount - Number of user visit this page
 */

(async () => {
  document.getElementById('historyBtn').addEventListener('click', async () => {
    await go()
  });
})();

async function export2File(data) {
  console.log('passed: ', data)
  const options = {
    types: [
      {
        description: 'Plain Text Files',
        accept: {
          'text/plain': ['.txt'],
        },
      },
    ],
  };
  const urls = data.map(history => history.url);
  const handle = await window.showSaveFilePicker(options);
  await writeFile(handle, urls);
};

async function writeFile(fileHandle, contents) {
  console.log(contents)
  const writable = await fileHandle.createWritable();
  await writable.write(contents.join('\n'));
  await writable.close();
}

//==================================
let nextEndTimeToUse = 0;
let allItems = [];
let itemIdToIndex = {};

/**
 * 
 * @param {callback} callback - Callback exetuted when once request finished
 */
function getMoreHistory(callback) {

  const params = {text:"", maxResults:500};
  params.startTime = 0;
  if (nextEndTimeToUse > 0)
    params.endTime = nextEndTimeToUse;

  chrome.history.search(params, function(items) {
    let fetched = 0;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.id in itemIdToIndex)
        continue;
      fetched += 1;
      allItems.push(item);
      itemIdToIndex[item.id] = allItems.length - 1;
    }
    if (items && items.length > 0) {
      nextEndTimeToUse = items[items.length-1].lastVisitTime;
    }
    callback(fetched);
  });
}

async function go() {
  getMoreHistory(async (cnt) => { 
    console.log("got " + cnt);
    if (cnt > 0) {
      go(); 
    } else {
      await export2File(allItems);
    }
  });
}
