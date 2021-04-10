import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useInterval } from 'use-interval';
import { RouteComponentProps } from 'react-router-dom';
import { Task as Component } from './Task';
import { createTaskTimeLog, fetchSerp, fetchTaskInfo, Serp, TaskInfo } from '../../shared/apis/apis';
import { useAuth } from 'shared/provider/authProvider';

// type SerpPage = {
//   title: string;
//   snippet: string;
//   url: string;
//   cookies: string[];
//   linkedPages: HistoryTable[];
// };

type Props = RouteComponentProps<{ taskid?: string }>;

export const Task: React.FC<Props> = (props) => {
  const dummyTask: TaskInfo = {
    query: 'dummyQuery',
    title: 'dummyTitle',
    description: 'dummyDescription',
    authorId: 'dummyAuthorId',
    searchUrl: 'dummySearchUrl',
    type: '',
  };

  const auth = useAuth();
  const [task, setTask] = useState<TaskInfo>(dummyTask);
  const [serpPages, setSerpPages] = useState<Serp[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { seconds, minutes } = useStopwatch({ autoStart: true });

  const getTimeOnPage = () => minutes * 60 + seconds;

  useInterval(async () => {
    if (!window.document.hidden) {
      await createTaskTimeLog({
        id: auth.user?.email || '',
        uid: auth.user?.uid || '',
        timeOnPage: minutes * 60 + seconds,
        url: document.URL,
        // How do we fetch these?
        taskId: 5,
        conditionId: 5,
      });
    }
  }, 1000);

  useEffect(() => {
    // getSerp();
    fetchSerp(5).then((serp) => setSerpPages(serp));
    fetchTaskInfo(5).then((taskInfo) => (taskInfo ? setTask(taskInfo) : setTask(dummyTask)));
  }, []);

  return <Component isLoading={isLoading} serpPages={serpPages} getTimeOnPage={getTimeOnPage} task={task} />;
};
