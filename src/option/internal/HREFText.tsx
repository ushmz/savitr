import React from 'react';
import TextTruncate from 'react-text-truncate';

type Props = {
  title: string;
  url: string;
  onClick?: () => {};
};

export const HREFText: React.FC<Props> = ({ title, url, onClick }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      <TextTruncate line={1} element="p" truncateText="..." text={title} />
      {/* If text lines don't appear, use code below. */}
      {/* <LinkedPageText>{truncateText(title, 33)}</LinkedPageText> */}
    </a>
  );
};
