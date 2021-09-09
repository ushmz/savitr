import axios from 'axios';
import { API_ENDPOINT } from 'shared/config';
import { getJWT } from 'shared/utils';

export type TaskTimeLogParam = {
  user: number;
  task: number;
  condition: number;
};

export const createTaskTimeLog = async (param: TaskTimeLogParam): Promise<void> => {
  const response = await axios.post(`${API_ENDPOINT}/v1/users/logs/time`, param, {
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

export type ClickLogParam = {
  user: number;
  taskId: number;
  conditionId: number;
  time: number;
  page: number;
  rank: number;
  visible: boolean;
};

export const createClickLog = async (param: ClickLogParam): Promise<void> => {
  const response = await axios.post(`${API_ENDPOINT}/v1/users/logs/click`, param, {
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
