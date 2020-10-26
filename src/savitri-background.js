chrome.runtime.onMessage.addListener( async (request, sender, sendResponse) => {
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
    case 'getPageId':
      try {
        const pageId = await getPageId(request.target);  
        const cookieIds = await getCookieIds(pageId);
        const cookies = await getCookies(cookieIds);
        console.log('before sending', cookies[0], typeof cookies);
        chrome.tabs.sendMessage(sender.tab.id, {cookies: cookies, annotateId: request.annotateId, target: request.target, status: true});
      } catch(err) {
        console.log('NoPageFoundError: ', err.msg)
        chrome.tabs.sendMessage(sender.tab.id, {cookies: err.cookies, annotateId: request.annotateId, target: request.target, status: err.status});
        return true;
      };
      return true;
    default:
      sendResponse({status: false, message: 'No match method.'});
      return true;
  }
});
