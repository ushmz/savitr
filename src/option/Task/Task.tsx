import { MDBBtn, MDBPageItem, MDBPageNav, MDBPagination } from 'mdbreact';
import React from 'react';
import { Pages, SERPElement } from '../../shared/types';
import { SearchContainer } from '../internal/AdjustedComponents';
import { PrivacyTaskSearchResult } from '../internal/SearchResult';
import { SearchHeader } from '../internal/SearchBar';
import { ComponentLoader } from '../internal/ComponentLoader';
import { SERP_MAX_PAGE, SERP_MIN_PAGE } from '../../shared/consts';

type NavBtnProps = {
  serpPage: number;
  setSerpPage: React.Dispatch<React.SetStateAction<number>>;
};

export const LeftNavBtn: React.FC<NavBtnProps> = ({ serpPage, setSerpPage }) => {
  let indicate = 0;
  if (serpPage === SERP_MIN_PAGE) {
    indicate = serpPage;
  } else if (serpPage === SERP_MAX_PAGE) {
    indicate = serpPage - 2;
  } else {
    indicate = serpPage - 1;
  }

  return (
    <div onClick={() => setSerpPage(indicate)}>
      {indicate}
      {serpPage == SERP_MIN_PAGE && <span className="sr-only">(current)</span>}
    </div>
  );
};

export const CenterNavBtn: React.FC<NavBtnProps> = ({ serpPage, setSerpPage }) => {
  let indicate = 0;
  if (serpPage === SERP_MIN_PAGE) {
    indicate = serpPage + 1;
  } else if (serpPage === SERP_MAX_PAGE) {
    indicate = serpPage - 1;
  } else {
    indicate = serpPage;
  }

  return (
    <div onClick={() => setSerpPage(indicate)}>
      {indicate}
      {serpPage != SERP_MIN_PAGE && serpPage != SERP_MAX_PAGE && <span className="sr-only">(current)</span>}
    </div>
  );
};

export const RightNavBtn: React.FC<NavBtnProps> = ({ serpPage, setSerpPage }) => {
  let indicate = 0;
  if (serpPage === SERP_MIN_PAGE) {
    indicate = serpPage + 2;
  } else if (serpPage === SERP_MAX_PAGE) {
    indicate = serpPage;
  } else {
    indicate = serpPage + 1;
  }

  return (
    <div onClick={() => setSerpPage(indicate)}>
      {indicate}
      {serpPage == SERP_MAX_PAGE && <span className="sr-only">(current)</span>}
    </div>
  );
};

type Props = {
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  serpPage: number;
  setSerpPage: React.Dispatch<React.SetStateAction<number>>;
  serpPages: SERPElement[];
};

export const Task: React.FC<Props> = ({ isLoading, setPage, serpPage, setSerpPage, serpPages }) => {
  return (
    <>
      <SearchHeader title="Custom Search" placeholder="ウェブカメラ おすすめ"></SearchHeader>
      <SearchContainer>
        {isLoading ? (
          <ComponentLoader />
        ) : (
          <>
            {serpPages.map((page) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <PrivacyTaskSearchResult
                  title={page.title}
                  snippet={page.snippet}
                  url={page.url}
                  linkedPages={page.linkedPages}
                />
              );
            })}
            <MDBPagination className="my-5 mx-a">
              <MDBPageItem disabled={serpPage === SERP_MIN_PAGE}>
                <MDBPageNav aria-label="Previous" onClick={() => setSerpPage(serpPage - 1)}>
                  <span aria-hidden="true">Previous</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active={serpPage === SERP_MIN_PAGE}>
                <MDBPageNav>
                  <LeftNavBtn serpPage={serpPage} setSerpPage={setSerpPage}></LeftNavBtn>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active={serpPage !== SERP_MIN_PAGE && serpPage !== SERP_MAX_PAGE}>
                <MDBPageNav>
                  <CenterNavBtn serpPage={serpPage} setSerpPage={setSerpPage}></CenterNavBtn>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active={serpPage === SERP_MAX_PAGE}>
                <MDBPageNav>
                  <RightNavBtn serpPage={serpPage} setSerpPage={setSerpPage}></RightNavBtn>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem disabled={serpPage === SERP_MAX_PAGE}>
                <MDBPageNav aria-label="Previous" onClick={() => setSerpPage(serpPage + 1)}>
                  <span aria-hidden="true">Next</span>
                </MDBPageNav>
              </MDBPageItem>
            </MDBPagination>
          </>
        )}
      </SearchContainer>
      <MDBBtn color="primary" className="float-left disabled" onClick={() => setPage('PreTask')}>
        「事前アンケート」へ
      </MDBBtn>
      <MDBBtn color="primary" onClick={() => setPage('PostTask')}>
        「事後アンケート」へ
      </MDBBtn>
    </>
  );
};
