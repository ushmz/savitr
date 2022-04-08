import { SerpType, Serp, SerpWithIcon, SerpWithDistribution, SerpSimple } from 'shared/types';

import { instance } from '.';

export const makeSearchSesion = async (user: number, taskId: number, conditionId: number): Promise<void> => {
  const response = await instance.post('/v1/logs/session', { user: user, task: taskId, condition: conditionId });

  if (response.status === 201) {
    return;
  } else {
    console.log('Error fetch error.');
    return;
  }
};

export const fetchSerpWithIcon = async (taskId: number, offset: number, top?: number): Promise<SerpWithIcon[]> => {
  const response = await instance.get<SerpWithIcon[]>(
    `/v1/serp/${taskId}/icon?offset=${offset}${top ? '&top=' + top : ''}`,
  );

  if (response.status === 200) {
    return response.data;
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
  const response = await instance.get<SerpWithDistribution[]>(
    `/v1/serp/${taskId}/ratio?offset=${offset}${top ? '&top=' + top : ''}`,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Error fetch error.');
    return [];
  }
};

export const fatchSerp = async (taskId: number, offset: number): Promise<SerpSimple[]> => {
  const response = await instance.get<SerpSimple[]>(`/v1/serp/${taskId}?offset=${offset}`);

  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Error fetch error.');
    return [];
  }
};

export const fetchSearchResults = async (taskId: number, offset: number, style: SerpType): Promise<Serp[]> => {
  const response = await instance.get<Serp[]>(`/v1/serp/${taskId}/${style}?offset=${offset}`);

  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Error fetch error.');
    return [];
  }
};
