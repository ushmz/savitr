import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useInterval } from 'use-interval';
import { useStopwatch } from 'react-timer-hook';
import { SearchResultPage as Component } from './Search';
import { Serp, TaskInfo, fetchSerp, fetchTaskInfo, createTaskTimeLog } from '../../shared/apis/apis';
import { useAuth } from 'shared/provider/authProvider';

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

  const taskIdNum = parseInt(props.match.params.taskid);
  const [serpPages, setSerpPages] = useState<Serp[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [task, setTask] = useState<TaskInfo>(dummyTask);
  const { minutes, seconds } = useStopwatch({ autoStart: true });
  const getTimeOnPage = () => minutes * 60 + seconds;

  useInterval(async () => {
    if (!window.document.hidden) {
      await createTaskTimeLog({
        id: auth.user?.email || 'void',
        uid: auth.user?.uid || 'void',
        timeOnPage: minutes * 60 + seconds,
        url: document.URL,
        taskId: taskIdNum,
        conditionId: taskIdNum,
      });
    }
  }, 1000);

  useEffect(() => {
    fetchTaskInfo(taskIdNum).then((taskInfo) => {
      taskInfo ? setTask(taskInfo) : setTask(dummyTask);
    });
    fetchSerp(taskIdNum, 0).then((serp) => setSerpPages(serp));
    window.scrollTo(0, 0);
  }, [offset]);
  return (
    <Component offset={offset} setOffset={setOffset} pageList={serpPages} task={task} getTimeOnPage={getTimeOnPage} />
  );
};
