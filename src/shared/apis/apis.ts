import axios from 'axios';
import { API_ENDPOINT } from '../config';

const getJWT = () => localStorage.getItem('jwt') || '';

type UserResponse = {
  // This return value seems `InsertedId`
  exist: boolean;
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
    return response.data as number;
  } else {
    throw new Error('Failed to fetch completion code.');
  }
};

export type TaskInfo = {
  id: number;
  query: string;
  title: string;
  description: string;
  searchUrl: string;
};

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

export const makeSearchSesion = async (user: number, taskId: number, conditionId: number): Promise<void> => {
  const response = await axios.post(
    `${API_ENDPOINT}/v1/task/session`,
    { user: user, task: taskId, condition: conditionId },
    {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    },
  );

  if (response.status === 201) {
    return;
  } else {
    console.log('Error fetch error.');
    return;
  }
};

export type SerpType = 'icon' | 'pct';

export type SimilarwebPage = {
  id: string;
  title: string;
  url: string;
  icon: string;
  category?: number;
};

export type SerpSimple = {
  id: string;
  title: string;
  url: string;
  snippet: string;
};

export type Serp = SerpSimple & {
  leaks?: SimilarwebPage[];
  total?: number;
  distribution?: {
    category: string;
    count: number;
    pct: number;
  }[];
};

export type SerpWithIcon = SerpSimple & {
  leaks: SimilarwebPage[];
};

export type SerpWithDistribution = SerpSimple & {
  total: number;
  distribution: {
    category: string;
    count: number;
    pct: number;
  }[];
};

export const fetchSerpWithIcon = async (taskId: number, offset: number, top?: number): Promise<SerpWithIcon[]> => {
  const response = await axios.get(
    `${API_ENDPOINT}/v1/serp/${taskId}/icon?offset=${offset}${top ? '&top=' + top : ''}`,
    {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    },
  );

  if (response.status === 200) {
    return response.data as SerpWithIcon[];
  } else {
    console.log('Error fetch error.');
    return [];
  }
};

export const fetchSerpWithDistribution = async (
  taskId: number,
  offset: number,
  top?: number,
): Promise<SerpWithDistribution[]> => {
  const response = await axios.get(
    `${API_ENDPOINT}/v1/serp/${taskId}/pct?offset=${offset}${top ? '&top=' + top : ''}`,
    {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    },
  );

  if (response.status === 200) {
    return response.data as SerpWithDistribution[];
  } else {
    console.log('Error fetch error.');
    return [];
  }
};

export const fetchSerp = async (taskId: number, offset: number, style: SerpType): Promise<Serp[]> => {
  const response = await axios.get(`${API_ENDPOINT}/v1/serp/${taskId}/${style}?offset=${offset}`, {
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
  user: number;
  task: number;
  time: number;
  condition: number;
};

export type TaskTimeLog = {
  user: number;
  task: number;
  time: number;
  condition: number;
};

export const createTaskTimeLog = async (param: TaskTimeLogParam): Promise<void> => {
  const timeLog: TaskTimeLog = {
    user: param.user,
    time: param.time,
    task: param.task,
    condition: param.condition,
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
