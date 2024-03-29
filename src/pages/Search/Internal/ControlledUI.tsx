import React from 'react';

import { SearchResult } from 'pages/Search/Internal/SearchResult';

type ControlledUIProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const ControlledUI: React.FC<ControlledUIProps> = (props) => {
  return <SearchResult {...props} />;
};
