import React from 'react';
import { createClickLog, Serp, TaskInfo } from '../../../shared/apis/apis';
import { getUserId, truncateText } from '../../../shared/util';

type SearchResultProps = {
  page: Serp;
  task: TaskInfo;
  getTimeOnPage: () => number;
  rank: number;
  offset: number;
};

/**
 * Last of this component must be wrapped by <div> tag with `hlcw0c` className
 */
export const SearchResult: React.FC<SearchResultProps> = ({ page, task, rank, offset, getTimeOnPage }) => {
  const user = getUserId();
  const isLeaksVisible = (rank + 1) % 2 !== 0 && Object.keys(page.leaks).length !== 0;
  return (
    <div className="g">
      <div className={`pr${offset}-${rank} linfo-${isLeaksVisible} lp-${Object.keys(page.leaks).length}`}>
        <div className="tF2Cxc">
          {/* URL and page title component */}
          <div className="yuRUbf">
            <a
              href={page.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                createClickLog({
                  user: user,
                  taskId: task.id,
                  conditionId: task.conditionId,
                  time: getTimeOnPage(),
                  rank: rank,
                  page: offset,
                  visible: isLeaksVisible,
                });
              }}
            >
              <br />
              <h3 className="LC20lb DKV0Md">{truncateText(page.title, 30)}</h3>
              <div className="TbwUpd NJjxre">
                <cite className="iUh30 Zu0yb qLRx3b tjvcx">
                  {truncateText(decodeURI(page.url), 72)}
                  <span className="dyjrff qzEoUe">{/* If there is some category or URL params */}</span>
                </cite>
              </div>
            </a>
          </div>
          <div className="IsZvec">
            <div className="VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc">
              <span className="MUxGbd wuQ4Ob WZ8Tjf">{/* Page createdAt or updatedAt */}</span>
              <span>{truncateText(page.snippet, 180)}</span>
            </div>
          </div>
          {/* 「他の人はこちらも検索」のやつ*/}
          {isLeaksVisible && (
            <div id="eob_21">
              <div className="AUiS2" style={{ display: 'block', opacity: 1 }}>
                <div style={{ display: 'none' }}>
                  <div></div>
                </div>
                <div>
                  <div className="d8lLoc">
                    <h4 className="eJ7tvc">{'第3者に過去に訪問したことが知られてしまう可能性があるページ'}</h4>
                    <span
                      className="XCKyNd"
                      aria-label="第3者に過去に訪問したことが知られてしまう可能性があるページ"
                      role="button"
                      tabIndex={0}
                    ></span>
                    <div className="hYkSRb">
                      <div className="exp-c">
                        {Object.entries(page.leaks).map(([k, v]) => {
                          return (
                            // <a key={k} href={v.url}>
                            <img
                              key={k}
                              src={v.icon}
                              onError={(e) => {
                                const target = e.target as HTMLElement;
                                // console.log(`error on rank : ${rank}\n`, target);
                                target.style.display = 'none';
                                // const leaksArea = document.getElementById('eob_21');
                                // if (leaksArea != null) {
                                //   leaksArea.style.display = 'none';
                                // }
                              }}
                              style={{ height: 30, objectFit: 'cover' }}
                            />
                            // </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
