import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useInterval } from 'use-interval';
import { RouteComponentProps } from 'react-router-dom';
import { Task as Component } from './Task';
import { sendBehaviorLog } from '../../repository/logAPI';
import { SERPElement } from '../../shared/types';
import tasks from '../../constants/tasks';
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
  

  // TODO: Fix logic
  /*
  const getSerp = async () => {
    if (!taskId) return;

    setLoading(true);
    const results = await getAllPageIn(taskName);
    const serpElements = results.map(async (page) => {
      try {
        const pageId = await getPageId(taskName, page.start_uri);
        const cookieIds = await getCookieIds(taskName, pageId);
        const cookieDomains = await getCookieDomains(taskName, cookieIds);
        const linkedPages = await getCollectedHistory(cookieDomains);
        return {
          title: page.title,
          snippet: page.snippet,
          url: page.start_uri,
          cookies: cookieDomains,
          linkedPages: shuffle(linkedPages),
        };
      } catch (error) {
        return {
          title: page.title,
          snippet: page.snippet,
          url: page.start_uri,
          cookies: [],
          linkedPages: [],
        };
      }
    });

    window.scrollTo(0, 0);
    const allSerpPages = (await Promise.all(serpElements)) as SerpPage[];
    const riskyPages = allSerpPages.filter((p) => p.linkedPages.length !== 0) || [];
    const saftyPages = allSerpPages.filter((p) => p.linkedPages.length === 0) || [];

    const showSerpPages: SerpPage[] = [];
    if (saftyPages.length >= 10) {
      const riskyPageSample = shuffle(riskyPages).slice(0, saftyPages.length);
      showSerpPages.concat(riskyPageSample, saftyPages);
      setSerpPages(shuffle(riskyPageSample.concat(saftyPages)));
    } else {
      const riskyPageSample = shuffle(riskyPages).slice(0, 20 - saftyPages.length);
      showSerpPages.concat(riskyPageSample, saftyPages);
      setSerpPages(shuffle(riskyPageSample.concat(saftyPages)));
    }
    setLoading(false);
  };
  */

  useEffect(() => {
    // getSerp();
    fetchSerp(5).then( (serp) => serp ? setSerpPages(serp) : setSerpPages([]));
    fetchTaskInfo(5).then((taskInfo) => taskInfo ? setTask(taskInfo) : setTask(dummyTask));
  }, []);

  return <Component isLoading={isLoading} serpPages={serpPages} getTimeOnPage={getTimeOnPage} task={task} />;
};

