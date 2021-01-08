import { MDBBtn, MDBCol, MDBPageItem, MDBPageNav, MDBPagination, MDBRow } from 'mdbreact';
import React, { useState } from 'react';
import { Pages, SERPElement } from '../../shared/types';
import { RootContainer, SearchContainer } from '../internal/AdjustedComponents';
import { PrivacyTaskSearchResult } from '../internal/SearchResult';
import { SearchHeader } from '../internal/SearchBar';
import { ComponentLoaderCenter } from '../internal/ComponentLoader';
import { SERP_MAX_PAGE, SERP_MIN_PAGE } from '../../shared/consts';
import { ConfirmPopup } from '../internal/ConfirmPopup';

const getLeftIndicateNum = (serpPage: number) => {
  let indicate = 0;
  if (serpPage === SERP_MIN_PAGE) {
    indicate = serpPage;
  } else if (serpPage === SERP_MAX_PAGE) {
    indicate = serpPage - 2;
  } else {
    indicate = serpPage - 1;
  }

  return indicate;
};

const getCenterIndicateNum = (serpPage: number) => {
  let indicate = 0;
  if (serpPage === SERP_MIN_PAGE) {
    indicate = serpPage + 1;
  } else if (serpPage === SERP_MAX_PAGE) {
    indicate = serpPage - 1;
  } else {
    indicate = serpPage;
  }
  return indicate;
};

const getRightindicateNum = (serpPage: number) => {
  let indicate = 0;
  if (serpPage === SERP_MIN_PAGE) {
    indicate = serpPage + 2;
  } else if (serpPage === SERP_MAX_PAGE) {
    indicate = serpPage;
  } else {
    indicate = serpPage + 1;
  }
  return indicate;
};

type Props = {
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  serpPage: number;
  setSerpPage: React.Dispatch<React.SetStateAction<number>>;
  serpPages: SERPElement[];
};

export const Task: React.FC<Props> = ({ isLoading, setPage, serpPage, setSerpPage, serpPages }) => {
  const [isOpen, toggle] = useState<boolean>(false);

  const leftNum = getLeftIndicateNum(serpPage);
  const centerNum = getCenterIndicateNum(serpPage);
  const rightNum = getRightindicateNum(serpPage);

  return (
    <>
      <MDBRow>
        <SearchHeader title="Custom Search" placeholder="ウェブカメラ おすすめ"></SearchHeader>
      </MDBRow>
      <MDBRow>
        <MDBCol md="8">
          <SearchContainer className="ml-3 mt-3">
            {isLoading ? (
              <ComponentLoaderCenter />
            ) : (
              <>
                {serpPages.map((page, idx) => {
                  return (
                    <PrivacyTaskSearchResult
                      key={idx}
                      title={page.title}
                      snippet={page.snippet}
                      url={page.url}
                      linkedPages={page.linkedPages}
                    />
                  );
                })}
                <MDBPagination className="my-5">
                  <MDBPageItem disabled={serpPage === SERP_MIN_PAGE}>
                    <MDBPageNav aria-label="Previous" onClick={() => setSerpPage(serpPage - 1)}>
                      <span aria-hidden="true">Previous</span>
                    </MDBPageNav>
                  </MDBPageItem>
                  <MDBPageItem active={serpPage === SERP_MIN_PAGE}>
                    <MDBPageNav onClick={() => setSerpPage(leftNum)}>
                      {leftNum}
                      {serpPage == SERP_MIN_PAGE && <span className="sr-only" />}
                    </MDBPageNav>
                  </MDBPageItem>
                  <MDBPageItem active={serpPage !== SERP_MIN_PAGE && serpPage !== SERP_MAX_PAGE}>
                    <MDBPageNav onClick={() => setSerpPage(centerNum)}>
                      {centerNum}
                      {serpPage != SERP_MIN_PAGE && serpPage != SERP_MAX_PAGE && (
                        <span className="sr-only">(current)</span>
                      )}
                    </MDBPageNav>
                  </MDBPageItem>
                  <MDBPageItem active={serpPage === SERP_MAX_PAGE}>
                    <MDBPageNav onClick={() => setSerpPage(rightNum)}>
                      {rightNum}
                      {serpPage == SERP_MAX_PAGE && <span className="sr-only">(current)</span>}
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
        </MDBCol>
        <MDBCol md="4">
          <RootContainer className="ml-3 mt-3">
            <MDBBtn onClick={() => toggle(!isOpen)}>回答する</MDBBtn>
            <ConfirmPopup isOpen={isOpen} toggle={toggle} confirmationCallback={() => setPage('PostTask')} />
          </RootContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
};
