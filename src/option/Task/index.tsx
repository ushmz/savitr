import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useInterval } from 'use-interval';
import { Task as Component } from './Task';
import {
  getCollectedHistory,
  getCookieDomains,
  getCookieIds,
  getPageId,
  getResultRanged,
} from '../../repository/indexedDB';
import { Pages, SERPElement } from '../../shared/types';
import { sendBehaviorLog } from '../../repository/logger';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Task: React.FC<Props> = ({ setPage }) => {
  const [serpPage, setSerpPage] = useState<number>(1);
  const [serpPages, setSerpPages] = useState<SERPElement[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { seconds, minutes } = useStopwatch({ autoStart: true });

  useInterval(async () => {
    if (!window.document.hidden) {
      await sendBehaviorLog({
        id: chrome.runtime.id,
        timeOnPage: minutes * 60 + seconds,
        positionOnPage: 0,
      });
    }
  }, 1);

  const getSerp = async () => {
    setLoading(true);
    const results = await getResultRanged(serpPage - 1);
    const serpElements = results.map(async (page) => {
      const pageId = await getPageId('serp', page.start_uri);
      const cookieIds = await getCookieIds('serp', pageId);
      const cookieDomains = await getCookieDomains('serp', cookieIds);
      const linkedPages = await getCollectedHistory(cookieDomains);

      return {
        title: page.title,
        snippet: page.snippet,
        url: page.start_uri,
        cookies: cookieDomains,
        linkedPages: linkedPages,
      };
    });

    window.scrollTo(0, 0);
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
