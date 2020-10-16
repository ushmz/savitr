chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  switch (request.method) {
    case 'length':
      sendResponse({data: localStorage.length, status:true});
      return true;
    case 'key':
      sendResponse({data: localStorage.key(request.number), status:true});
      return true;
    case 'get':
      sendResponse({data: localStorage.getItem(request.key), key:request.key, status:true});
      return true;
    case 'set':
      sendResponse({data: localStorage.setItem(request.key, request.value), key:request.key, value:request.value, status:true});
      return true;
    case 'remove':
      sendResponse({data: localStorage.removeItem[request.key], status:true});
      return true;
    case 'clear':
      sendResponse({data: localStorage.clear(), status:true});
      return true;
    default:
      sendResponse({data: 'no match method', status:false})
      return true;
  }
});