import React from 'react';
import { SearchResult } from './SearchResult';

type ControlledUIProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
};

export const ControlledUI: React.FC<ControlledUIProps> = (props) => {
  return <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />;
};
