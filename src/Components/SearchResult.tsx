import React from 'react';
import { URLText, TitleText, SearchResultContainer, SizedText } from './AdjustedComponents';
import { truncateText } from '../shared/util';
import { sendDocumentClickLog } from '../repository/logAPI';
import { LeakedPage } from '../shared/apis/apis';

type Props = {
  title: string;
  url: string;
  snippet: string;
  leakedPages: LeakedPage[];
  getTimeOnPage: () => number;
  taskName: string;
  visible: boolean;
};

/**
 * Return single search result component used in web search task.
 */
export const SearchResult: React.FC<Props> = ({
  title,
  snippet,
  url,
  leakedPages,
  getTimeOnPage,
  taskName,
  visible,
}) => {
  return (
    <SearchResultContainer className="pl-3 py-3" style={{ width: '720px' }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          sendDocumentClickLog({
            uid: localStorage.getItem('uid') || '',
            taskName: taskName,
            timeOnPage: getTimeOnPage(),
            pageUrl: url,
            linkedPageNum: leakedPages.length,
          });
        }}
      >
        <URLText size="14px">{truncateText(url, 72)}</URLText>
        <TitleText size="18px">{truncateText(title, 33)}</TitleText>
      </a>
      <SizedText size="14px">{truncateText(snippet || '', 200)}</SizedText>
      {leakedPages.length === 0 ? (
        <></>
      ) : (
        visible && (
          <div className="m-3">
            <CollectedTendencyIconList
              histories={leakedPages}
              documentURL={url}
              getTimeOnPage={getTimeOnPage}
              taskName={taskName}
            ></CollectedTendencyIconList>
          </div>
        )
      )}
    </SearchResultContainer>
  );
};

type CollectedTendencyIconListProps = {
  histories: LeakedPage[];
  documentURL: string;
  getTimeOnPage: () => number;
  taskName: string;
};

const CollectedTendencyIconList: React.FC<CollectedTendencyIconListProps> = (props) => {
  const icons = props.histories.map((history) => {
    return (
      <img
        key={history.id}
        src={history.icon}
        // @ts-ignore
        onError={(e) => (e.target.style.display = 'none')}
        style={{ height: 30, objectFit: 'cover' }}
      />
    );
  });

  return <>{icons.slice(0, 5)}</>;
};
