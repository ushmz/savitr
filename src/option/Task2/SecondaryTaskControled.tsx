import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBTypography } from 'mdbreact';
import React, { useState } from 'react';
import { Pages, SERPElement } from '../../shared/types';
import { SearchResult } from '../internal/SearchResult';
import { SearchHeader } from '../internal/SearchBar';
import { ComponentLoaderCenter } from '../internal/ComponentLoader';
import { ConfirmPopup } from '../internal/ConfirmPopup';
import { SizedText } from '../internal/AdjustedComponents';

type Props = {
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  serpPages: SERPElement[];
  getTimeOnPage: () => number;
  taskName: string;
};

export const SecondaryTask: React.FC<Props> = ({ isLoading, setPage, serpPages, getTimeOnPage, taskName }) => {
  const [isOpen, toggle] = useState<boolean>(false);

  return (
    <>
      <MDBRow>
        <SearchHeader title="Custom Search" placeholder="糖尿病 症状"></SearchHeader>
      </MDBRow>
      <MDBRow className="pt-5">
        {isLoading ? (
          <ComponentLoaderCenter />
        ) : (
          <>
            <div className="pl-5 pt-5 ml-5">
              {serpPages.map((page, idx) => {
                return (
                  <SearchResult
                    key={idx}
                    title={page.title}
                    snippet={page.snippet}
                    url={page.url}
                    linkedPages={[]}
                    getTimeOnPage={getTimeOnPage}
                    taskName={taskName}
                  />
                );
              })}
            </div>
            <div className="mt-3 ml-3">
              <MDBCard className="position-fixed border border-dark m-3 rounded-lg" style={{ width: '400px' }}>
                <MDBCardBody>
                  <MDBCardTitle>タスク内容</MDBCardTitle>
                  <SizedText size="14px">
                    「すぐに喉が渇く」「動悸・息切れ」などの症状は糖尿病に該当するか調べてください。
                  </SizedText>
                  <MDBTypography tag="ul">
                    <li>
                      <SizedText size="13px">検索クエリは変更できません。</SizedText>
                    </li>
                    <li>
                      <SizedText size="13px">
                        表示された検索結果リスト及び、そのリンク先のページのみ閲覧してください。検索結果は新規タブで開かれます。
                      </SizedText>
                    </li>
                    <li>
                      <SizedText size="13px">
                        検索タスクの終了時には「糖尿病に該当するかどうか」「決め手となった理由」の2点をお尋ねします。
                      </SizedText>
                    </li>
                    <li>
                      <SizedText size="13px">制限時間はありませんので、納得のいくまで検索を行ってください。</SizedText>
                    </li>
                  </MDBTypography>
                  <MDBBtn onClick={() => toggle(!isOpen)}>回答する</MDBBtn>
                </MDBCardBody>
              </MDBCard>
              <ConfirmPopup answer="糖尿病かどうか" isOpen={isOpen} toggle={toggle} setPage={setPage} goto="PostTask" />
            </div>
          </>
        )}
      </MDBRow>
    </>
  );
};
