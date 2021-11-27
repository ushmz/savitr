import React, { Dispatch, SetStateAction } from 'react';
import { MDBRow } from 'mdbreact';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';
import { ControlledUI } from 'Pages/Search/Internal/ControlledUI';
import { IconUI } from 'Pages/Search/Internal/IconUI';
import { RatioUI } from 'Pages/Search/Internal/RatioUI';
import { SerpPagination } from 'Pages/Search/Internal/Pagination';
import { SearchHeader } from 'Pages/Search/Internal/SearchBarHeader';
import { createClickLog } from 'shared/apis';
import { Serp, TaskInfo } from 'shared/types';
import { getConditionId, getUserId } from 'shared/utils';

type SearchResultPageProps = {
  condition: number;
  task: TaskInfo;
  pageList: Serp[];
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  getTimeOnPage: () => number;
  isLoading: boolean;
};

export const SearchResultPage: React.FC<SearchResultPageProps> = (props) => {
  const user = getUserId();
  const condition = getConditionId();

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
              {props.pageList.map((page, idx) => {
                const sendClickLog = () => {
                  createClickLog({
                    user: user,
                    taskId: props.task.id,
                    conditionId: condition,
                    time: props.getTimeOnPage(),
                    rank: idx + 1,
                    page: props.offset + 1,
                    visible: true,
                  });
                };
                if (props.condition === 5) {
                  return (
                    <div key={`icon-${props.offset}-${idx}`} style={styles.searchResult}>
                      <IconUI
                        title={page.title}
                        url={page.url}
                        snippet={page.snippet}
                        tracked={page.leaks || []}
                        sendClickLog={sendClickLog}
                      />
                    </div>
                  );
                } else if (props.condition === 6) {
                  return (
                    <div key={`ratio-${props.offset}-${idx}`} style={styles.searchResult}>
                      <RatioUI
                        title={page.title}
                        url={page.url}
                        snippet={page.snippet}
                        tracked={{ total: page.total || 0, distribution: page.distribution || [] }}
                        sendClickLog={sendClickLog}
                      />
                    </div>
                  );
                }
                return (
                  <div key={`controlled-${props.offset}-${idx}`} style={styles.searchResult}>
                    <ControlledUI
                      title={page.title}
                      url={page.url}
                      snippet={page.snippet}
                      sendClickLog={sendClickLog}
                    />
                  </div>
                );
              })}
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
  searchResult: {
    marginBottom: '15px',
  },
  searchResults: {
    marginLeft: '180px',
    paddingTop: '20px',
  },
};
