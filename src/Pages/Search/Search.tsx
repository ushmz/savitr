import React, { Dispatch, SetStateAction } from 'react';
import { MDBRow } from 'mdbreact';
import { Serp, TaskInfo } from 'shared/types';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';
import { SearchResultUnit } from 'Pages/Search/Internal/SearchResult';
import { SerpPagination } from 'Pages/Search/Internal/Pagination';
import { SearchHeader } from 'Pages/Search/Internal/SearchBarHeader';

type SearchTaskProps = {
  task: TaskInfo;
  pageList: Serp[];
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  getTimeOnPage: () => number;
  isLoading: boolean;
};

export const SearchResultPage: React.FC<SearchTaskProps> = (props) => {
  return (
    <>
      <SearchHeader query={props.task.query} />
      {props.isLoading ? (
        <ComponentLoaderCenter />
      ) : (
        <div>
          <div style={styles.pageIndicator}>{`${props.offset + 1}ページ / 10ページ`}</div>
          <MDBRow>
            <div style={styles.searchResults}>
              {props.pageList.map((page, idx) => (
                <SearchResultUnit
                  key={idx}
                  page={page}
                  task={props.task}
                  rank={idx + 1}
                  offset={props.offset + 1}
                  getTimeOnPage={props.getTimeOnPage}
                />
              ))}
              <SerpPagination
                task={props.task}
                offset={props.offset}
                setOffset={props.setOffset}
                getTimeOnPage={props.getTimeOnPage}
              />
            </div>
          </MDBRow>
        </div>
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageIndicator: {
    position: 'relative',
    height: '43px',
    marginLeft: '160px',
    fontSize: '14px',
    color: '#70757a',
    minWidth: '652px',
    lineHeight: '43px',
  },
  searchResults: {
    marginLeft: '180px',
    paddingTop: '20px',
  },
};
