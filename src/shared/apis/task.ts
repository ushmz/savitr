import axios from 'axios';
import { API_ENDPOINT } from 'shared/config';
import { getJWT } from 'shared/utils';
import { TaskInfo } from 'shared/types';

export const fetchTaskInfo = async (taskId: number): Promise<TaskInfo | undefined> => {
  const response = await axios.get(`${API_ENDPOINT}/v1/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });

  if (response.status === 200) {
    return response.data as TaskInfo;
  } else {
    console.log('Error fetch error.');
    return;
  }
};

export type AnswerParam = {
  user: number;
  uid: string;
  task: number;
  condition: number;
  answer: string;
  reason: string;
};

export const createTaskAnswer = async (param: AnswerParam): Promise<void> => {
  const response = await axios.post(`${API_ENDPOINT}/v1/task/answer`, param, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });
  if (response.status === 201) {
    return;
  } else {
    console.log('[Error] Failed to create answer');
    return;
  }
};
