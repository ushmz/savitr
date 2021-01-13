export async function dropAllDatabase(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const HistoryDBBDeleteRequest = indexedDB.deleteDatabase('history');
    HistoryDBBDeleteRequest.onerror = () => {
      console.log(HistoryDBBDeleteRequest.error);
      reject();
    };
    const xrayedDBDeleteRequest = indexedDB.deleteDatabase('xrayed');
    xrayedDBDeleteRequest.onerror = () => {
      console.log(xrayedDBDeleteRequest.error);
      reject();
    };
    const serpDBDeleteRequest = indexedDB.deleteDatabase('serp');
    serpDBDeleteRequest.onerror = () => {
      console.log(serpDBDeleteRequest.error);
      reject();
    };
    resolve();
  });
}
