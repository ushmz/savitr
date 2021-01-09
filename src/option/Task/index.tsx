import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useInterval } from 'use-interval';
import { Task as Component } from './Task';
import { sendBehaviorLog } from '../../repository/logAPI';
import { getCollectedHistory } from '../../repository/historyIDB';
import { getResultRanged } from '../../repository/serpIDB';
import { getCookieDomains, getCookieIds, getPageId } from '../../repository/xrayedIDB';
import { SERPElement, SetPageProp } from '../../shared/types';
import { shuffle } from '../../shared/util';

export const Task: React.FC<SetPageProp> = ({ setPage }) => {
  const [serpPage, setSerpPage] = useState<number>(1);
  const [serpPages, setSerpPages] = useState<SERPElement[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { seconds, minutes } = useStopwatch({ autoStart: true });

  useInterval(async () => {
    const target = document.body;
    const position = target.getBoundingClientRect();
    console.log({ page: serpPage, y: position.top });
    if (!window.document.hidden) {
      await sendBehaviorLog({
        uid: localStorage.getItem('uid') || 'Does not have uid!!',
        timeOnPage: minutes * 60 + seconds,
        currentPage: serpPage,
        positionOnPage: position.top,
      });
    }
  }, 1000);

  const getSerp = async () => {
    setLoading(true);
    const results = await getResultRanged(serpPage - 1);
    const serpElements = results.map(async (page) => {
      try {
        const pageId = await getPageId('serp', page.start_uri);
        const cookieIds = await getCookieIds('serp', pageId);
        const cookieDomains = await getCookieDomains('serp', cookieIds);
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
    // たぶん意味がない(Promise<Object>[]じゃなくてPromise<Object[]>だからawaitだけでいい？)
    setSerpPages(await Promise.all(serpElements));
    setLoading(false);
  };

  useEffect(() => {
    getSerp();
  }, [serpPage]);

  return (
    <Component
      isLoading={isLoading}
      setPage={setPage}
      serpPage={serpPage}
      setSerpPage={setSerpPage}
      serpPages={serpPages}
    />
  );
};
