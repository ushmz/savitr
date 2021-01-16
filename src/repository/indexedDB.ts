export async function dropAllDatabase(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    indexedDB.deleteDatabase('history');
    indexedDB.deleteDatabase('xrayed');
    indexedDB.deleteDatabase('tounyou');
    indexedDB.deleteDatabase('webcam');
    resolve();
  });
}
