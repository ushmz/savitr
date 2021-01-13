import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBTypography } from 'mdbreact';
import React, { useState } from 'react';
import { Pages, SERPElement } from '../../shared/types';
import { RootContainer, SearchContainer } from '../internal/AdjustedComponents';
import { PrivacyTaskSearchResult } from '../internal/SearchResult';
import { SearchHeader } from '../internal/SearchBar';
import { ComponentLoaderCenter } from '../internal/ComponentLoader';
import { ConfirmPopup } from '../internal/ConfirmPopup';

type Props = {
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  serpPages: SERPElement[];
};

export const Task: React.FC<Props> = ({ isLoading, setPage, serpPages }) => {
  const [isOpen, toggle] = useState<boolean>(false);

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
              serpPages.map((page, idx) => {
                return (
                  <PrivacyTaskSearchResult
                    key={idx}
                    title={page.title}
                    snippet={page.snippet}
                    url={page.url}
                    linkedPages={page.linkedPages}
                  />
                );
              })
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
