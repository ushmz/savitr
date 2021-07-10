import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useInterval } from 'use-interval';
import { useStopwatch } from 'react-timer-hook';
import { SearchResultPage as Component } from './Search';
import { Serp, TaskInfo, fetchSerp, fetchTaskInfo, createTaskTimeLog } from '../../shared/apis/apis';
import { useAuth } from 'shared/provider/authProvider';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';

type SearchProp = RouteComponentProps<{ taskid: string }>;

export const Search: React.FC<SearchProp> = (props) => {
  const dummyTask: TaskInfo = {
    id: 0,
    conditionId: 0,
    query: 'dummyQuery',
    title: 'dummyTitle',
    description: 'dummyDescription',
    authorId: 'dummyAuthorId',
    searchUrl: 'dummySearchUrl',
    type: '',
  };

  const auth = useAuth();
  const ext = auth.user?.email?.split('@')[0] || '';

  const taskIdNum = parseInt(props.match.params.taskid);
  const [serpPages, setSerpPages] = useState<Serp[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<TaskInfo>(dummyTask);
  const { minutes, seconds } = useStopwatch({ autoStart: true });
  const getTimeOnPage = () => minutes * 60 + seconds;

  useInterval(async () => {
    if (!window.document.hidden) {
      await createTaskTimeLog({
        id: ext + '-' + taskIdNum,
        uid: ext,
        timeOnPage: minutes * 60 + seconds,
        url: document.URL,
        taskId: taskIdNum,
        conditionId: taskIdNum,
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
    fetchSerp(taskIdNum, offset).then((serp) => {
      serp.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
      setSerpPages(serp);
    });
    setLoading(false);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return isLoading ? (
    <ComponentLoaderCenter />
  ) : (
    <Component offset={offset} setOffset={setOffset} pageList={serpPages} task={task} getTimeOnPage={getTimeOnPage} />
  );
};
