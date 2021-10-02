import axios from 'axios';
import { API_ENDPOINT } from 'shared/config';
import { getJWT } from 'shared/utils';

type UserResponse = {
  exist: boolean;
  user: number;
  secret: string;
  tasks: number[];
  condition: number;
  group: number;
};

export const createUser = async (uid: string): Promise<UserResponse> => {
  const instance = axios.create({
    baseURL: API_ENDPOINT,
    method: 'post',
    data: {
      uid: uid,
    },
  });
  const r = await instance
    .post('/users')
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
