import axios from 'axios';

import { API_ENDPOINT } from 'shared/config';

export * from 'shared/apis/user';
export * from 'shared/apis/task';
export * from 'shared/apis/search';
export * from 'shared/apis/log';

const instance = axios.create({
  baseURL: `${API_ENDPOINT}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.request.use((config) => {});

export { instance };
