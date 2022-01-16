import React, { Dispatch, SetStateAction } from 'react';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';
import { BaseUI } from 'Pages/Search/Internal/BaseUI';
import { ControlledUI } from 'Pages/Search/Internal/ControlledUI';
import { IconUI } from 'Pages/Search/Internal/IconUI';
import { RatioUI } from 'Pages/Search/Internal/RatioUI';
import { SerpPagination } from 'Pages/Search/Internal/Pagination';
import { SearchHeader } from 'Pages/Search/Internal/SearchBarHeader';
import { createEventLog, LoggingEventType } from 'shared/apis';
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

  const createEventHandler = (index: number, event: LoggingEventType) => {
    return () =>
      createEventLog({
        user: user,
        task: props.task.id,
        condition: condition,
        time: props.getTimeOnPage(),
        rank: index + 1,
        page: props.offset + 1,
        visible: index % 2 === 0,
        event: event,
      });
  };

  return (
    <>
      <SearchHeader query={props.task.query} />
      {props.isLoading ? (
        <ComponentLoaderCenter />
      ) : (
        <div>
          <div style={styles.pageIndicator}>{`${props.offset + 1}ページ / 10ページ`}</div>
          <div style={styles.row}>
            <div style={styles.searchResults}>
              {props.pageList.map((page, idx) => {
                const sendClickLog = createEventHandler(idx, 'click');
                const sendHoverLog = createEventHandler(idx, 'hover');

                if (idx % 2 !== 0) {
                  return (
                    <div key={`${props.condition}-${props.offset}-${idx}`} style={styles.searchResult}>
                      <ControlledUI
                        title={page.title}
                        url={page.url}
                        snippet={page.snippet}
                        sendClickLog={sendClickLog}
                      />
                    </div>
                  );
                } else if (props.condition === 5) {
                  return (
                    <div key={`${props.condition}-${props.offset}-${idx}`} style={styles.searchResult}>
                      <IconUI
                        title={page.title}
                        url={page.url}
                        // url={`/rslt?tsk=${props.task.id}&pgi=${page.id}&u=${page.url}`}
                        snippet={page.snippet}
                        linked={page.linked || []}
                        sendClickLog={sendClickLog}
                        sendHoverLog={sendHoverLog}
                      />
                    </div>
                  );
                } else if (props.condition === 7) {
                  return (
                    <div key={`${props.condition}-${props.offset}-${idx}`} style={styles.searchResult}>
                      <RatioUI
                        title={page.title}
                        url={page.url}
                        // url={`/rslt?tsk=${props.task.id}&pgi=${page.id}&u=${page.url}`}
                        snippet={page.snippet}
                        linked={{ total: page.total || 0, distribution: page.distribution || [] }}
                        sendClickLog={sendClickLog}
                        sendHoverLog={sendHoverLog}
                      />
                    </div>
                  );
                }

                // Else, return BaselineUI
                return (
                  <div key={`controlled-${props.offset}-${idx}`} style={styles.searchResult}>
                    <BaseUI
                      title={page.title}
                      url={page.url}
                      // url={`/rslt?tsk=${props.task.id}&pgi=${page.id}&u=${page.url}`}
                      snippet={page.snippet}
                      sendClickLog={sendClickLog}
                      sendHoverLog={sendHoverLog}
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
          </div>
        </div>
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: '-15px',
    marginLeft: '-15px',
  },
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
    marginBottom: '30px',
  },
  searchResults: {
    marginLeft: '180px',
    paddingTop: '20px',
  },
};
