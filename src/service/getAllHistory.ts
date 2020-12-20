// let nextEndTimeToUse = 0;
// let allItems = [];
// let itemIdToIndex = {};

// /**
//  *
//  * @param {callback} callback - Callback exetuted when once request finished
//  */
// function getMoreHistory(callback) {

//   const params = {text:"", maxResults:500};
//   params.startTime = 0;
//   if (nextEndTimeToUse > 0)
//     params.endTime = nextEndTimeToUse;

//   chrome.history.search(params, function(items) {
//     let fetched = 0;
//     for (let i = 0; i < items.length; i++) {
//       let item = items[i];
//       if (item.id in itemIdToIndex)
//         continue;
//       fetched += 1;
//       allItems.push(item);
//       itemIdToIndex[item.id] = allItems.length - 1;
//     }
//     if (items && items.length > 0) {
//       nextEndTimeToUse = items[items.length-1].lastVisitTime;
//     }
//       callback(fetched);
//   });
//   return allItems;
// }

// export function getHistories() {
//     return getMoreHistory((cnt) => {
//       console.log("got " + cnt);
//       if (cnt > 0) {
//         getHistories();
//       }
//     });
// }

// export async function getHistoriesAsync() {
//   return new Promise( (resolve, reject) => {
//     getMoreHistory( cnt => {
//       console.log('got '+ cnt);
//       if (cnt > 0) {
//         resolve(getHistoriesAsync());
//       } else {
//         resolve(allItems);
//       }
//     });
//   })
// }
