import {initializePageData, initializeHistory} from './IdxDB';

document.getElementById('initBtn').addEventListener('click', async () => {
  await initializePageData();  
})

document.getElementById('histBtn').addEventListener('click', async () => {
  await initializeHistory();
})