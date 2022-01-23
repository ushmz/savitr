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
  const response = await axios.post<UserResponse>(`${API_ENDPOINT}/api/users`, { uid: uid });
  return response.data;
};

export const fetchCompletionCode = async (id: string): Promise<number> => {
  const response = await axios.get<number>(`${API_ENDPOINT}/api/v1/users/code/${id}`, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to fetch completion code.');
  }
};
