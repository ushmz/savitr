import axios from 'axios';

import { API_ENDPOINT } from 'shared/config';
import { getJWT } from 'shared/utils';

export type SerpViewingLogParam = {
  user: number;
  task: number;
  condition: number;
};

export const createSerpViewingLog = async (param: SerpViewingLogParam): Promise<void> => {
  const response = await axios.post(`${API_ENDPOINT}/api/v1/logs/serp`, param, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });
  if (response.status === 201) {
    return;
  } else {
    console.log('[Error] Failed to create log.');
    return;
  }
};

export type PageViewingLogParam = {
  user: number;
  task: number;
  condition: number;
  page: number;
};

export const createPageViewingLog = async (param: PageViewingLogParam): Promise<void> => {
  const response = await axios.post(`${API_ENDPOINT}/api/v1/logs/pageview`, param, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });
  if (response.status === 201) {
    return;
  } else {
    console.log('[Error] Failed to create log.');
    return;
  }
};

export type LoggingEventType = 'click' | 'hover' | 'paginate';

export type EventLogParam = {
  user: number;
  task: number;
  condition: number;
  time: number;
  page: number;
  rank: number;
  visible: boolean;
  event: LoggingEventType;
};

export const createEventLog = async (param: EventLogParam): Promise<void> => {
  const response = await axios.post(`${API_ENDPOINT}/api/v1/logs/events`, param, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });
  if (response.status === 201) {
    return;
  } else {
    console.log('[Error] Failed to create log.');
    return;
  }
};
