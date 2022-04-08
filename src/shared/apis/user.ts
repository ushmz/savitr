import { instance } from '.';

type UserResponse = {
  token: string;
  user: number;
  tasks: number[];
  condition: number;
  group: number;
};

export const createUser = async (uid: string): Promise<UserResponse> => {
  const response = await instance.post<UserResponse>('/users', { uid: uid });
  return response.data;
};

export const createSession = async (token: string): Promise<void> => {
  await instance.post<void>('/session', { token: token });
  return;
};

export const fetchCompletionCode = async (id: string): Promise<number> => {
  const response = await instance.get<number>(`/v1/users/code/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to fetch completion code.');
  }
};
