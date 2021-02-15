import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useInterval } from 'use-interval';
import { Task as Component } from './Task';
import { sendBehaviorLog } from '../../repository/logAPI';
import { getCollectedHistory } from '../../repository/historyIDB';
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
  task: {
    id: number;
    slug: string;
    task: string;
    requiements: string[];
    placeholder: string;
  };
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Task: React.FC<TasProps> = ({ task, setPage }) => {
  const [serpPages, setSerpPages] = useState<SERPElement[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { seconds, minutes } = useStopwatch({ autoStart: true });

  const getTimeOnPage = () => minutes * 60 + seconds;

  useInterval(async () => {
    const target = document.body;
    const position = target.getBoundingClientRect();
    if (!window.document.hidden) {
      await sendBehaviorLog({
        uid: localStorage.getItem('uid') || '',
        taskName: task.slug,
        timeOnPage: minutes * 60 + seconds,
        currentPage: 1,
        positionOnPage: position.top,
      });
    }
  }, 1000);

  // TODO: Fix logic
  const getSerp = async () => {
    setLoading(true);
    const results = await getAllPageIn(task.slug);
    const serpElements = results.map(async (page) => {
      try {
        const pageId = await getPageId(task.slug, page.start_uri);
        const cookieIds = await getCookieIds(task.slug, pageId);
        const cookieDomains = await getCookieDomains(task.slug, cookieIds);
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

  useEffect(() => {
    getSerp();
  }, []);

  return (
    <Component
      isLoading={isLoading}
      setPage={setPage}
      serpPages={serpPages}
      getTimeOnPage={getTimeOnPage}
      task={task}
    />
  );
};
