import React from 'react';
import { truncateText } from '../../shared/util';
import { LinkedPageText } from './AdjustedComponents';

type Props = {
  title: string;
  url: string;
  onClick?: () => {};
};

export const HREFText: React.FC<Props> = ({ title, url, onClick }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      <LinkedPageText>{truncateText(title, 33)}</LinkedPageText>
    </a>
  );
};
