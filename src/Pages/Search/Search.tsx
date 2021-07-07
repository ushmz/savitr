import { MDBCol, MDBRow } from 'mdbreact';
import React, { Dispatch, SetStateAction } from 'react';
import { Serp, TaskInfo } from '../../shared/apis/apis';
import { SearchHeader } from './Internal/SearchHeader';
import { SearchResult } from './Internal/SearchResult';
import { SerpPagination } from './Internal/Pagination';

type SearchTaskProps = {
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  pageList: Serp[];
  task: TaskInfo;
  getTimeOnPage: () => number;
};

export const SearchResultPage: React.FC<SearchTaskProps> = (props) => {
  return (
    <>
      <link type="text/css" rel="stylesheet" href="css/googleish_footer.css" />
      <link type="text/css" rel="stylesheet" href="css/query_suggestion_area.css" />
      <link type="text/css" rel="stylesheet" href="css/search_result.css" />
      <link type="text/css" rel="stylesheet" href="css/googleish_head_3.css" />
      <link type="text/css" rel="stylesheet" href="css/search_bar.css" />
      <link type="text/css" rel="stylesheet" href="css/knowledge_panel.css" />
      <MDBRow className="mt-5">
        <SearchHeader query={props.task.query} />
      </MDBRow>
      <br />
      <MDBRow className="mt-5">
        <MDBCol md="1"></MDBCol>
        <MDBCol md="11">
          <SearchList {...props} />
        </MDBCol>
      </MDBRow>
    </>
  );
};

export const SearchList: React.FC<SearchTaskProps> = ({ offset, setOffset, pageList, task, getTimeOnPage }) => {
  return (
    <div className="main" id="main">
      <div className="cnt GyAeWb" id="rcnt">
        <div className="D6j0vc center_col">
          <div className="eqAnXb" id="res" role="main">
            <div className="search rso">
              {pageList.map((page, idx) => (
                <SearchResult
                  key={idx}
                  page={page}
                  task={task}
                  rank={idx}
                  offset={offset + 1}
                  getTimeOnPage={getTimeOnPage}
                />
              ))}
            </div>
            <div id="bres" className="botstuff">
              <div className="w3bYAd oIk2Cb ULSxyf">
                <h3 className="O3JH7">
                  <span className="mfMhoc">{/*他のキーワード*/}</span>
                </h3>
                <div className="y6Uyqe EIaa9b">
                  {/* `AJLUJb` is column */}
                  <div className="AJLUJb">
                    {/* <QueryCand> A query candidate component*/}
                    <div>
                      <a className="k8XOCe" href="#">
                        <div className="s75CSd OhScic AB4Wff">
                          <b>{/* Other query candidate */}</b>
                        </div>
                      </a>
                    </div>
                    {/* </QueryCand> */}
                  </div>
                </div>
              </div>
            </div>
            <div role="navigation">
              <span id="xjs">
                <h1 className="Uo8X3b OhScic zsYMMe">{/*ページの操作*/}</h1>
                <SerpPagination offset={offset} setOffset={setOffset} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
