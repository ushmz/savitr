import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook';
import { useInterval } from 'use-interval';
import { SearchResultPage as Component } from 'Pages/Search/Search';
import { fetchSearchResults, fetchTaskInfo, createSerpViewingLog } from 'shared/apis';
import { Serp, TaskInfo } from 'shared/types';
import { getConditionId, getUserId } from 'shared/utils';

type SearchProp = RouteComponentProps<{ taskid: string }>;

export const Search: React.FC<SearchProp> = (props) => {
  document.title = '検索結果リスト';
  const dummyTask: TaskInfo = {
    id: 0,
    query: '',
    title: '',
    description: '',
    searchUrl: '',
  };

  const userId = getUserId();
  const conditionId = getConditionId();

  const taskIdNum = parseInt(props.match.params.taskid);
  const [resultPages, setResultPages] = useState<Serp[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<TaskInfo>(dummyTask);
  const { minutes, seconds } = useStopwatch({ autoStart: true });
  const getTimeOnPage = () => minutes * 60 + seconds;

  useInterval(async () => {
    if (!window.document.hidden) {
      await createSerpViewingLog({
        user: userId,
        task: taskIdNum,
        condition: conditionId,
      });
    }
  }, 1000);

  useEffect(() => {
    fetchTaskInfo(taskIdNum).then((taskInfo) => {
      if (taskInfo) setTask(taskInfo);
    });
  }, [taskIdNum]);

  useEffect(() => {
    setLoading(true);
    const cond = conditionId === 5 ? 'icon' : 'ratio';
    fetchSearchResults(taskIdNum, offset, cond).then((serp) => {
      // serp.sort((a, b) => {
      //   if (a.id < b.id) return -1;
      //   if (a.id > b.id) return 1;
      //   return 0;
      // });
      setResultPages(serp);
      setLoading(false);
      window.scrollTo(0, 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <Component
      condition={conditionId}
      offset={offset}
      setOffset={setOffset}
      pageList={resultPages}
      task={task}
      getTimeOnPage={getTimeOnPage}
      isLoading={isLoading}
    />
  );
};
