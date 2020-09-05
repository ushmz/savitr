chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  switch (request.method) {
    case 'length':
      sendResponse({data: localStorage.length});
      return true;
    case 'key':
      sendResponse({data: localStorage.key(request.number)});
      return true;
    case 'get':
      sendResponse({data: localStorage.getItem(request.key), key:request.key});
      return true;
    case 'set':
      sendResponse({data: localStorage.setItem(request.key, request.value), key:request.key, value:request.value});
      return true;
    case 'remove':
      sendResponse({data: localStorage.removeItem[request.key]});
      return true;
    case 'clear':
      sendResponse({data: localStorage.clear()});
      return true;
    default:
      console.log('no method');
      sendResponse({data: 'no match method'})
      return true;
  }
});