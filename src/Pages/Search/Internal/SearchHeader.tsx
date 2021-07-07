import React from 'react';
import { SEARCH_SVG_PATH, CROSS_SVG_PATH } from '../../../shared/consts';

type SearchHeaderProps = {
  query: string;
};

export const SearchHeader: React.FC<SearchHeaderProps> = ({ query }) => {
  return (
    <div className="CvDJxb big" id="searchform" style={{ position: 'absolute', top: '20px' }}>
      <form className="tsf" action="/" id="tsf" method="GET" name="f" role="search">
        <div className="A8SBwf">
          <div className="RNNXgb">
            <div className="SDkEP">
              <div className="a4bIc">
                <div className="pR49Ae gsfi"></div>
                <input
                  disabled
                  className="gLFyf gsfi"
                  name="q"
                  type="text"
                  aria-autocomplete="both"
                  aria-haspopup="false"
                  role="combobox"
                  value={query}
                  aria-label="検索"
                />
              </div>
              <div className="dRYYxd">
                <div className="BKRPef M2vV3" aria-label="消去" role="button">
                  <span className="ExCKkf z1asCe rzyADb" role="button" tabIndex={0} aria-label="消去">
                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d={CROSS_SVG_PATH}></path>
                    </svg>
                  </span>
                  <span className="ACRAdd"></span>
                </div>
              </div>
            </div>
            <button disabled className="Tg7LZd" aria-label="検索">
              <div className="FAuhyb">
                <span className="z1asCe MZy1Rb">
                  <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d={SEARCH_SVG_PATH}></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
