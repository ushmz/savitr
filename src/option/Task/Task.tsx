import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBPageItem,
  MDBPageNav,
  MDBPagination,
  MDBRow,
  MDBTypography,
} from 'mdbreact';
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
        <MDBCol md="7">
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
        <MDBCol md="5">
          <RootContainer className="ml-3 mt-3">
            <MDBCard className="position-fixed">
              <MDBCardBody>
                <MDBCardTitle>タスク内容</MDBCardTitle>
                <MDBTypography tag="p">
                  リモートでのやり取りが増えたので、ウェブカメラを購入したいと思ったとします。
                  どれを購入するか迷ったあなたは、ひとまずウェブカメラについての情報収集のために、ウェブ検索することにしました。
                  タスク画面では、「ウェブカメラ おすすめ」というワードでウェブ検索した際の検索結果画面を想定し、
                  自分が購入したいウェブカメラを検索してください。自分が購入したいウェブカメラが決まったら検索を終了してください。
                </MDBTypography>
                <MDBTypography tag="ul">
                  <li>検索クエリは変更できません。</li>
                  <li>
                    検索結果は新規タブで開かれます。自由に閲覧していただいて構いませんが、新たなリンクをたどることはしないでください。
                  </li>
                  <li>
                    検索タスクの終了時には「購入したいと思った商品名」「一番参考になったページのURL」「決め手となった理由」
                    の3点をお尋ねします。
                  </li>
                  <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
                </MDBTypography>
                <MDBBtn onClick={() => toggle(!isOpen)}>回答する</MDBBtn>
              </MDBCardBody>
            </MDBCard>
            <ConfirmPopup isOpen={isOpen} toggle={toggle} confirmationCallback={() => setPage('PostTask')} />
          </RootContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
};
