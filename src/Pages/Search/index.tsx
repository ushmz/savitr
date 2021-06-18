import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchSerp } from '../../shared/apis/apis';
import { ExpTask as Component } from './Search';
import { Serp } from '../../shared/apis/apis';

type SearchProp = RouteComponentProps<{ taskid: string }>;

export const Search: React.FC<SearchProp> = (props) => {
  const taskIdNum = parseInt(props.match.params.taskid);
  const [serpPages, setSerpPages] = useState<Serp[]>([]);
  useEffect(() => {
    fetchSerp(taskIdNum, 0).then((serp) => setSerpPages(serp));
  }, []);
  return <Component pageList={serpPages} />;
};
