chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.method) {
    case 'history':
      chrome.history.search({text:'', maxResults: request.max}, histories => {
        console.log(histories);
        sendResponse({data: histories, status:true});
      });
      return true;
    case 'set':
      sendResponse({data: localStorage.setItem(request.key, request.value), key:request.key, value:request.value, status:true});
      return true;
    default:
      sendResponse({status: false, message: 'No match method.'});
      return true;
  }
});
