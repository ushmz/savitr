import axios from 'axios';

const API_ENDPOINT = process.env.BACKEND_ENDPOINT || 'http://localhost:8080';

const getJWT = () => localStorage.getItem('jwt') || '';

type UserResponse = {
  // This return value seems `InsertedId`
  user: number;
  secret: string;
  tasks: number[];
  condition: number;
  group: number;
};

export const createUser = async (uid: string): Promise<UserResponse> => {
  const r = await axios
    .post(`${API_ENDPOINT}/users`, {
      uid: uid,
    })
    .then((response) => {
      return response.data as UserResponse;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return r;
};

export const fetchCompletionCode = async (id: string): Promise<number> => {
  const response = await axios.get(`${API_ENDPOINT}/v1/users/code/${id}`, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });
  if (response.status === 200) {
    return response.data.completionCode;
  } else {
    throw new Error('Failed to fetch completion code.');
  }
};

export type TaskInfo = {
  id: number;
  conditionId: number;
  query: string;
  title: string;
  description: string;
  authorId: string;
  searchUrl: string;
  type: string;
};

export const fetchTaskInfo = async (taskId: number): Promise<TaskInfo | undefined> => {
  const response = await axios.get(`${API_ENDPOINT}/v1/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });

  if (response.status === 200) {
    return response.data[0] as TaskInfo;
  } else {
    console.log('Error fetch error.');
    return;
  }
};

export type SimilarwebPage = {
  id: string;
  title: string;
  url: string;
  icon: string;
};

export type Serp = {
  id: string;
  title: string;
  url: string;
  snippet: string;
  cookies: string[];
  leaks: SimilarwebPage[];
  leak_num?: number;
};

export const fetchSerp = async (taskId: number, offset: number): Promise<Serp[]> => {
  const response = await axios.get(`${API_ENDPOINT}/v1/serp/${taskId}?offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });

  if (response.status === 200) {
    return response.data as Serp[];
  } else {
    console.log('Error fetch error.');
    return [];
  }
};

export type TaskTimeLogParam = {
  id: string;
  uid: string;
  timeOnPage: number;
  url: string;
  taskId: number;
  conditionId: number;
};

export type TaskTimeLog = {
  id: string;
  authorId: number;
  uid: string;
  time: number;
  url: string;
  task: number;
  condition: number;
};

export const createTaskTimeLog = async (param: TaskTimeLogParam): Promise<void> => {
  const timeLog: TaskTimeLog = {
    id: param.id,
    authorId: 2,
    uid: param.uid,
    time: param.timeOnPage,
    url: param.url,
    task: param.taskId,
    condition: param.conditionId,
  };

  const response = await axios.post(`${API_ENDPOINT}/v1/users/logs/time`, timeLog, {
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

export type AnswerParam = {
  user: number;
  uid: string;
  taskId: number;
  conditionId: number;
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
