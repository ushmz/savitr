import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useInterval } from 'use-interval';
import { SecondaryTask as Component } from './SecondaryTaskControled';
import { sendBehaviorLog } from '../../repository/logAPI';
import { getAllPageIn } from '../../repository/serpIDB';
import { getCookieDomains, getCookieIds, getPageId } from '../../repository/xrayedIDB';
import { HistoryTable, Pages, SERPElement } from '../../shared/types';
import { shuffle } from '../../shared/util';

type SerpPage = {
  title: string;
  snippet: string;
  url: string;
  cookies: string[];
  linkedPages: HistoryTable[];
};

type TasProps = {
  taskName: string;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Task: React.FC<TasProps> = ({ taskName, setPage }) => {
  const [serpPages, setSerpPages] = useState<SERPElement[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { seconds, minutes } = useStopwatch({ autoStart: true });

  const getTimeOnPage = () => minutes * 60 + seconds;

  useInterval(async () => {
    const target = document.body;
    const position = target.getBoundingClientRect();
    if (!window.document.hidden) {
      await sendBehaviorLog({
        uid: localStorage.getItem('uid') || 'Does not have uid!!',
        taskName: taskName,
        timeOnPage: minutes * 60 + seconds,
        currentPage: 1,
        positionOnPage: position.top,
      });
    }
  }, 1000);

  const getSerp = async () => {
    setLoading(true);
    const results = await getAllPageIn(taskName);
    const serpElements = results.map(async (page) => {
      try {
        const pageId = await getPageId(taskName, page.start_uri);
        const cookieIds = await getCookieIds(taskName, pageId);
        const cookieDomains = await getCookieDomains(taskName, cookieIds);
        return {
          title: page.title,
          snippet: page.snippet,
          url: page.start_uri,
          cookies: cookieDomains,
          linkedPages: [],
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
    setSerpPages(shuffle(allSerpPages).slice(0, 20));
    setLoading(false);
  };

  useEffect(() => {
    getSerp();
  }, []);

  return (
    <Component
      isLoading={isLoading}
      setPage={setPage}
      serpPages={serpPages}
      getTimeOnPage={getTimeOnPage}
      taskName={taskName}
    />
  );
};
