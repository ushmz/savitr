import { TaskInfo } from 'shared/types';

import { instance } from '.';

export const fetchTaskInfo = async (taskId: number): Promise<TaskInfo | undefined> => {
  const response = await instance.get<TaskInfo>(`/v1/task/${taskId}`);

  if (response.status === 200) {
    return response.data;
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
  const response = await instance.post('/v1/task/answer', param);
  if (response.status === 201) {
    return;
  } else {
    console.log('[Error] Failed to create answer');
    return;
  }
};
