import axios from 'axios';
import { API_ENDPOINT } from 'shared/config';
import { getJWT } from 'shared/utils';
import { SerpType, Serp, SerpWithIcon, SerpWithDistribution, SerpSimple } from 'shared/types';

export const makeSearchSesion = async (user: number, taskId: number, conditionId: number): Promise<void> => {
  const response = await axios.post(
    `${API_ENDPOINT}/api/v1/logs/session`,
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

export const fetchSerpWithIcon = async (taskId: number, offset: number, top?: number): Promise<SerpWithIcon[]> => {
  const response = await axios.get<SerpWithIcon[]>(
    `${API_ENDPOINT}/api/v1/serp/${taskId}/icon?offset=${offset}${top ? '&top=' + top : ''}`,
    {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    },
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
  const response = await axios.get<SerpWithDistribution[]>(
    `${API_ENDPOINT}/api/v1/serp/${taskId}/ratio?offset=${offset}${top ? '&top=' + top : ''}`,
    {
      headers: {
        Authorization: `Bearer ${getJWT()}`,
      },
    },
  );

  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Error fetch error.');
    return [];
  }
};

export const fatchSerp = async (taskId: number, offset: number): Promise<SerpSimple[]> => {
  const response = await axios.get<SerpSimple[]>(`${API_ENDPOINT}/api/v1/serp/${taskId}?offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Error fetch error.');
    return [];
  }
};

export const fetchSearchResults = async (taskId: number, offset: number, style: SerpType): Promise<Serp[]> => {
  const response = await axios.get<Serp[]>(`${API_ENDPOINT}/api/v1/serp/${taskId}/${style}?offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Error fetch error.');
    return [];
  }
};
