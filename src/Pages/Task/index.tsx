import React, { useEffect, useState } from 'react';
// import { useStopwatch } from 'react-timer-hook';
// import { useInterval } from 'use-interval';
import { RouteComponentProps } from 'react-router-dom';
import { Task as Component } from './Task';
import { fetchSerp, fetchTaskInfo, Serp, TaskInfo } from '../../shared/apis/apis';
// import { useAuth } from 'shared/provider/authProvider';

// type SerpPage = {
//   title: string;
//   snippet: string;
//   url: string;
//   cookies: string[];
//   linkedPages: HistoryTable[];
// };

type TaskProps = RouteComponentProps<{ taskid?: string }>;

export const Task: React.FC<TaskProps> = (props: TaskProps) => {
  const taskIdNum = parseInt(props.match.params.taskid!);
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

  // const auth = useAuth();
  const [task, setTask] = useState<TaskInfo>(dummyTask);
  const [serpPages, setSerpPages] = useState<Serp[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [offset, setOffset] = useState<number>(0);

  // const { seconds, minutes } = useStopwatch({ autoStart: true });

  // const getTimeOnPage = () => minutes * 60 + seconds;

  // useInterval(async () => {
  //   if (!window.document.hidden) {
  //     await createTaskTimeLog({
  //       id: auth.user?.email || '',
  //       uid: auth.user?.uid || '',
  //       timeOnPage: minutes * 60 + seconds,
  //       url: document.URL,
  //       taskId: taskIdNum,
  //       conditionId: taskIdNum,
  //     });
  //   }
  // }, 1000);

  useEffect(() => {
    // getSerp();
    fetchSerp(taskIdNum, offset).then((serp) => setSerpPages(serp));
    fetchTaskInfo(taskIdNum).then((taskInfo) => {
      taskInfo ? setTask(taskInfo) : setTask(dummyTask);
    });
    window.scrollTo(0, 0);
  }, [offset]);

  return (
    <Component
      isLoading={isLoading}
      serpPages={serpPages}
      offset={offset}
      setOffset={setOffset}
      getTimeOnPage={() => 1}
      task={task}
    />
  );
};
