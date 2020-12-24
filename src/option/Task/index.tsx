import React, { useEffect, useState } from 'react';
import { getResultRanged } from '../../service/indexedDB';
import { Pages, SERPElement } from 'shared/types';
import { Task as Component } from './Task';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

const sampleSnippet =
  '木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。道路の位置も幾たびか改まったもので、古道はいつのまにか深い山間に埋もれた。名高い桟も、';
const sampleCookies = ['hoge', 'fuga'];
const sampleLinkedPages = [
  { title: 'やばいページ', url: 'https://example.com/yabai' },
  { title: 'すごいページ', url: 'https://example.com/sugoi' },
];

export const Task: React.FC<Props> = ({ setPage }) => {
  const [serpPage, setSerpPage] = useState<number>(1);
  const [serpPages, setSerpPages] = useState<SERPElement[]>([]);

  const getSerp = async () => {
    const results = await getResultRanged(serpPage - 1);
    // TODO Convert PageIDBTable to SERPElements
    const serpElements = results.map((page) => {
      return {
        title: page.title,
        snippet: sampleSnippet,
        url: page.start_uri,
        cookies: sampleCookies,
        linkedPages: sampleLinkedPages,
      };
    });
    window.scrollTo(0, 0);
    setSerpPages(serpElements);
  };

  useEffect(() => {
    getSerp();
  }, [serpPage]);

  return (
    <Component
      setPage={setPage}
      serpPage={serpPage}
      setSerpPage={setSerpPage}
      serpPages={serpPages}
      linkedPages={sampleLinkedPages}
    />
  );
};
