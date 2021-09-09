import axios from 'axios';
import { API_ENDPOINT } from 'shared/config';
import { getJWT } from 'shared/utils';
import { SerpType, Serp, SerpWithIcon, SerpWithDistribution } from 'shared/types';

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
