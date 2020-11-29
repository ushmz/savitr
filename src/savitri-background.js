import {getPageId, getCookieIds, getCookies, initializeHistory, initializeTable} from './IdxDB';

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  switch (request.method) {
    // Get user's history and response it.
    case 'history':
      chrome.history.search({text:'', maxResults: request.max}, histories => {
        sendResponse({data: histories, status:true});
      });
      return true;
    // Get cookies that given page contain.
    case 'getCookies':
      getPageId(request.target)
      .then(pageId => getCookieIds(pageId))
      .then(cookieIds => getCookies(cookieIds))
      .then( cookies => {
        chrome.tabs.sendMessage(sender.tab.id, {cookies: cookies, annotateId: request.annotateId, target: request.target, status: true});
        return true;
      })
      .catch( err => {
        console.log(err.error, err.message);
        chrome.tabs.sendMessage(sender.tab.id, {cookies: err.cookies, annotateId: request.annotateId, target: request.target, status: err.status, error: err});
        return true;
      });
    // Default response
    default:
      sendResponse({status: false, message: 'No match method.'});
      return true;
  }
});

chrome.runtime.onInstalled.addListener( details => {
  if (details.reason = 'installed') {
    await initializeTable();
    await initializeHistory();
  }
});