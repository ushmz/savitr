import { MDBBtn, MDBPageItem, MDBPageNav, MDBPagination } from 'mdbreact';
import React from 'react';
import { Pages, SERPElement } from '../../shared/types';
import { SearchContainer } from '../../shared/AdjustedComponents';
import { PrivacyTaskSearchResult } from '../internal/SearchResult';
import { SearchHeader } from '../../shared/SearchBar';
import { ComponentLoader } from '../../shared/ComponentLoader';

type Props = {
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  serpPage: number;
  setSerpPage: React.Dispatch<React.SetStateAction<number>>;
  serpPages: SERPElement[];
};

type NavBtnProps = {
  serpPage: number;
  setSerpPage: React.Dispatch<React.SetStateAction<number>>;
};

const MIN_PAGE = 1;
const MAX_PAGE = 10;

export const LeftNavBtn: React.FC<NavBtnProps> = ({ serpPage, setSerpPage }) => {
  let indicate = 0;
  if (serpPage === MIN_PAGE) {
    indicate = serpPage;
  } else if (serpPage === MAX_PAGE) {
    indicate = serpPage - 2;
  } else {
    indicate = serpPage - 1;
  }

  return (
    <div onClick={() => setSerpPage(indicate)}>
      {indicate}
      {serpPage == MIN_PAGE && <span className="sr-only">(current)</span>}
    </div>
  );
};

export const CenterNavBtn: React.FC<NavBtnProps> = ({ serpPage, setSerpPage }) => {
  let indicate = 0;
  if (serpPage === MIN_PAGE) {
    indicate = serpPage + 1;
  } else if (serpPage === MAX_PAGE) {
    indicate = serpPage - 1;
  } else {
    indicate = serpPage;
  }

  return (
    <div onClick={() => setSerpPage(indicate)}>
      {indicate}
      {serpPage != MIN_PAGE && serpPage != MAX_PAGE && <span className="sr-only">(current)</span>}
    </div>
  );
};

export const RightNavBtn: React.FC<NavBtnProps> = ({ serpPage, setSerpPage }) => {
  let indicate = 0;
  if (serpPage === MIN_PAGE) {
    indicate = serpPage + 2;
  } else if (serpPage === MAX_PAGE) {
    indicate = serpPage;
  } else {
    indicate = serpPage + 1;
  }

  return (
    <div onClick={() => setSerpPage(indicate)}>
      {indicate}
      {serpPage == MAX_PAGE && <span className="sr-only">(current)</span>}
    </div>
  );
};

export const Task: React.FC<Props> = ({ isLoading, setPage, serpPage, setSerpPage, serpPages }) => {
  return (
    <>
      <SearchHeader title="Custom Search" placeholder="ウェブカメラ おすすめ"></SearchHeader>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <>
          <SearchContainer>
            {serpPages.map((page) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <PrivacyTaskSearchResult
                  title={page.title}
                  snippet={page.snippet}
                  url={page.url}
                  cookies={page.cookies}
                  linkedPages={page.linkedPages}
                />
              );
            })}
            <MDBPagination className="my-5 mx-a">
              <MDBPageItem disabled={serpPage === MIN_PAGE}>
                <MDBPageNav aria-label="Previous" onClick={() => setSerpPage(serpPage - 1)}>
                  <span aria-hidden="true">Previous</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active={serpPage === MIN_PAGE}>
                <MDBPageNav>
                  <LeftNavBtn serpPage={serpPage} setSerpPage={setSerpPage}></LeftNavBtn>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active={serpPage !== MIN_PAGE && serpPage !== MAX_PAGE}>
                <MDBPageNav>
                  <CenterNavBtn serpPage={serpPage} setSerpPage={setSerpPage}></CenterNavBtn>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active={serpPage === MAX_PAGE}>
                <MDBPageNav>
                  <RightNavBtn serpPage={serpPage} setSerpPage={setSerpPage}></RightNavBtn>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem disabled={serpPage === MAX_PAGE}>
                <MDBPageNav aria-label="Previous" onClick={() => setSerpPage(serpPage + 1)}>
                  <span aria-hidden="true">Next</span>
                </MDBPageNav>
              </MDBPageItem>
            </MDBPagination>
          </SearchContainer>
          <MDBBtn color="primary" className="float-left disabled" onClick={() => setPage('PreTask')}>
            「事前アンケート」へ
          </MDBBtn>
          <MDBBtn color="primary" onClick={() => setPage('PostTask')}>
            「事後アンケート」へ
          </MDBBtn>
        </>
      )}
    </>
  );
};
