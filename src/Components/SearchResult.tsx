import React from 'react';
import { URLText, TitleText, SearchResultContainer, SizedText } from './AdjustedComponents';
import { truncateText } from '../shared/util';
import { SimilarwebPage, createClickLog, Serp, TaskInfo } from '../shared/apis/apis';

export type SearchResultProps = {
  rank: number;
  pageOnSerp: number;
  task: TaskInfo;
  page: Serp;
  getTimeOnPage: () => number;
  visible: boolean;
};

/**
 * Return single search result component used in web search task.
 */
export const SearchResult: React.FC<SearchResultProps> = ({ rank, pageOnSerp, task, page, getTimeOnPage, visible }) => {
  return (
    <SearchResultContainer className="pl-3 py-3" style={{ width: '720px' }}>
      <a
        href={page.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          createClickLog({
            user: 0,
            taskId: task.id,
            conditionId: task.conditionId,
            time: getTimeOnPage(),
            rank: rank,
            page: pageOnSerp,
            visible: false,
          });
        }}
      >
        <URLText size="14px">{truncateText(page.url, 72)}</URLText>
        <TitleText size="18px">{truncateText(page.title, 33)}</TitleText>
      </a>
      <SizedText size="14px">{truncateText(page.snippet || '', 200)}</SizedText>
      {page.leaks.length === 0 ? (
        <></>
      ) : (
        visible && (
          <div className="m-3">
            <CollectedTendencyIconList leaks={page.leaks} documentURL={page.url}></CollectedTendencyIconList>
          </div>
        )
      )}
    </SearchResultContainer>
  );
};

type CollectedTendencyIconListProps = {
  leaks: SimilarwebPage[];
  documentURL: string;
};

const CollectedTendencyIconList: React.FC<CollectedTendencyIconListProps> = (props) => {
  const icons = props.leaks.map((history) => {
    return (
      <img
        key={history.id}
        src={history.icon}
        onError={(e) => {
          const target = e.target as HTMLElement;
          target.style.display = 'none';
        }}
        style={{ height: 30, objectFit: 'cover' }}
      />
    );
  });

  return <>{icons.slice(0, 7)}</>;
};
