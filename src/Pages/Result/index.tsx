import React from 'react';
import { useLocation } from 'react-router-dom';
import { createPageViewingLog } from 'shared/apis';
import { getConditionId, getUserId } from 'shared/utils';
import useInterval from 'use-interval';
import { ResultDocument as Component } from './ResultDocument';

export const ResultDocument: React.FC = () => {
  const userId = getUserId();
  const conditionId = getConditionId();

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const taskId = parseInt(query.get('tsk') || '');
  const pageId = parseInt(query.get('pgi') || '');
  const url = decodeURI(query.get('u') || '');

  useInterval(async () => {
    if (!window.document.hidden) {
      await createPageViewingLog({
        user: userId,
        task: taskId,
        condition: conditionId,
        page: pageId,
      });
    }
  }, 1000);

  return <Component url={url} />;
};