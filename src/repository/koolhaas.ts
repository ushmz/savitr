import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8080';

export const createUser = async (uid: string): Promise<number> => {
  const response = await axios.post(`${API_ENDPOINT}/users/signup`, {
    uid: uid,
    externalId: uid,
  });
  if (response.status === 200) {
    return response.data.userId;
  } else {
    return 0;
  }
};

export type TaskInfo = {
  query: string;
  title: string;
  description: string;
  authorId: string;
  searchUrl: string;
  type: string;
};

export const fetchTaskInfo = async (taskId: number): Promise<TaskInfo | undefined> => {
  const response = await axios.get(`${API_ENDPOINT}/v1/savitr/tasks/${taskId}`);

  if (response.status === 200) {
    return response.data[0] as TaskInfo;
  } else {
    console.log('Error fetch error.');
    return;
  }
};

export type LeakedPage = {
  id: string;
  title: string;
  url: string;
  thumb: string;
  cookies: {
    String: string;
    Valid: boolean;
  };
};

export type Serp = {
  id: string;
  title: string;
  url: string;
  snippet: string;
  cookies: string[];
  leaks: { [key: string]: LeakedPage };
};

export const fetchSerp = async (taskId: number): Promise<Serp[]> => {
  const response = await axios.get(`${API_ENDPOINT}/v1/savitr/serps/${taskId}`);

  if (response.status === 200) {
    return response.data as Serp[];
  } else {
    console.log('Error fetch error.');
    return [];
  }
};

export const uploadUserFile = async (userId: string, file: File): Promise<void> => {
  const params = new FormData();
  params.append('uploadFile', file);
  params.append('userId', userId);

  const headers = {
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  const response = await axios.post(`${API_ENDPOINT}/v1/users/${userId}/upload`, params, { headers: headers });
  if (response.status === 200) {
    return;
  } else {
    console.log('[Error] Failed to upload file.');
    return;
  }
};

export type TaskTimeLogParam = {
  userId: string;
  timeOnPage: number;
  url: string;
  taskId: number;
  conditionId: number;
};

export type TaskTimeLog = {
  id: string;
  autherId: number;
  uid: string;
  timeOnPage: number;
  url: string;
  taskId: number;
  conditionId: number;
};

export const createTaskTimeLog = async (param: TaskTimeLogParam): Promise<void> => {
  const timeLog: TaskTimeLog = {
    id: param.userId,
    autherId: 2,
    uid: param.userId,
    timeOnPage: param.timeOnPage,
    url: '',
    taskId: param.taskId,
    conditionId: param.conditionId,
  };

  const response = await axios.post(`${API_ENDPOINT}/v1/users/${param.userId}/logs`, timeLog);
  if (response.status === 200) {
    return;
  } else {
    console.log('[Error] Failed to create log.');
    return;
  }
};

export type ThumbnailWatchLogParam = {
  userId: string;
  timeOnPage: number;
  url: string;
  taskId: number;
  conditionId: number;
};

export type ThumbnailWatchLog = {
  id: string;
  autherId: number;
  uid: string;
  timeOnPage: number;
  url: string;
  taskId: number;
  conditionId: number;
};

export const createThumbnailWatchLog = async (param: ThumbnailWatchLogParam): Promise<void> => {
  const timeLog = {
    id: param.userId,
    autherId: 2,
    uid: param.userId,
    timeOnPage: param.timeOnPage,
    url: '',
    taskId: param.taskId,
    conditionId: param.conditionId,
  };

  const response = await axios.post(`${API_ENDPOINT}/v1/users/${param.userId}/logs`, timeLog);
  if (response.status === 200) {
    return;
  } else {
    console.log('[Error] Failed to create log.');
    return;
  }
};
