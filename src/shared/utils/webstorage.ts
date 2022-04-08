import { KEY_CONDITION, KEY_GROUP, KEY_PRIMARY_TASK, KEY_SECONDARY_TASK, KEY_UID, KEY_USERID } from 'shared/consts';

export const getJWT = (): string => localStorage.getItem('jwt') || '';

export const getUserID = (): number => {
  const userstr = localStorage.getItem(KEY_USERID) || '0';
  return parseInt(userstr);
};

export const setUserID = (val: number) => {
  localStorage.setItem(KEY_USERID, val + '');
};

export const getUID = (): string => {
  return localStorage.getItem(KEY_UID) || '';
};

export const setUID = (val: string) => {
  localStorage.setItem(KEY_UID, val);
};

export const getConditionID = (): number => {
  const condstr = localStorage.getItem(KEY_CONDITION) || '0';
  return parseInt(condstr);
};

export const setConditionID = (val: number) => {
  localStorage.setItem(KEY_CONDITION, val + '');
};

export const isExperimentalGroup = (): boolean => {
  const conditionId = localStorage.getItem(KEY_CONDITION) || '';
  return conditionId !== '6';
};

export const getGroupID = (): number => {
  const groupID = localStorage.getItem(KEY_GROUP) || '';
  return parseInt(groupID);
};

export const setGroupID = (val: number) => {
  localStorage.setItem(KEY_GROUP, val + '');
};

export const getPrimaryTaskID = (): number => {
  const idstr = localStorage.getItem(KEY_PRIMARY_TASK) || '0';
  return parseInt(idstr);
};

export const setPrimaryTaskID = (val: number) => {
  localStorage.setItem(KEY_PRIMARY_TASK, val + '');
};

export const getSecondaryTaskID = (): number => {
  const idstr = localStorage.getItem(KEY_SECONDARY_TASK) || '0';
  return parseInt(idstr);
};

export const setSecondaryTaskID = (val: number) => {
  localStorage.setItem(KEY_SECONDARY_TASK, val + '');
};
