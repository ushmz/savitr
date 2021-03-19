import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useInterval } from 'use-interval';
import { RouteComponentProps } from 'react-router-dom';
import { Task as Component } from './Task';
import { sendBehaviorLog } from '../../repository/logAPI';
import { ComponentLoaderCenter } from '../../Components/ComponentLoader';
import { fetchSerp, fetchTaskInfo, Serp, TaskInfo } from '../../repository/koolhaas';

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
	query: "dummyQuery",
	title: "dummyTitle",
	description: "dummyDescription",
	authorId: "dummyAuthorId",
	searchUrl: "dummySearchUrl",
	"type": "",
    }
 
  const [task, setTask] = useState<TaskInfo>(dummyTask);
  const [serpPages, setSerpPages] = useState<Serp[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { seconds, minutes } = useStopwatch({ autoStart: true });

  const getTimeOnPage = () => minutes * 60 + seconds;

  // const taskId = props.match.params.taskid;
  // const taskName = taskId ? tasks[+taskId - 1].slug : '';
  // useInterval(async () => {
  //   const target = document.body;
  //   const position = target.getBoundingClientRect();
  //   if (!window.document.hidden) {
  //     await sendBehaviorLog({
  //       uid: localStorage.getItem('uid') || '',
  //       taskName: taskName,
  //       timeOnPage: minutes * 60 + seconds,
  //       currentPage: 1,
  //       positionOnPage: position.top,
  //     });
  //   }
  // }, 1000);


  useEffect(() => {
    // getSerp();
    fetchSerp(5).then((serp) => setSerpPages(serp));
    fetchTaskInfo(5).then((taskInfo) => taskInfo ? setTask(taskInfo) : setTask(dummyTask));
  }, []);

  return <Component isLoading={isLoading} serpPages={serpPages} getTimeOnPage={getTimeOnPage} task={task} />;
};

