import {initializeTable, initializeHistory} from './IdxDB';

document.getElementById('initBtn').addEventListener('click', async () => {
  await initializeTable();  
})

document.getElementById('histBtn').addEventListener('click', async () => {
  await initializeHistory();
})