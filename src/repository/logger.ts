import axios from 'axios';
import { BehaviorLog, DocumentClickLog, HistoryClickLog } from '../shared/types';

const ENDPOINT = 'http://localhost:8000';

export const sendBehaviorLog = async (behaviorLog: BehaviorLog) => {
  const response = await axios.post(`${ENDPOINT}/storelog`, behaviorLog, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  });
  console.log(response.data);
};

export const sendDocumentClickLog = async (clickLog: DocumentClickLog) => {
  const response = await axios.post(`${ENDPOINT}/storelog`, clickLog, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  });
  console.log(response.data);
};

export const sendHistoryClickLog = async (clickLog: HistoryClickLog) => {
  const response = await axios.post(`${ENDPOINT}/storelog`, clickLog, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  });
  console.log(response.data);
};

export const challenge = async () => {
  const query = { challenge: 'savitri-gayatri' };
  const response = await axios.post(`${ENDPOINT}/ping`, query, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  });

  return query.challenge === response.data.challenge;
};
