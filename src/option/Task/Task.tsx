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
};

export const Task: React.FC<Props> = ({ isLoading, setPage, serpPages }) => {
  const [isOpen, toggle] = useState<boolean>(false);

  return (
    <>
      <MDBRow>
        <SearchHeader title="Custom Search" placeholder="ウェブカメラ おすすめ"></SearchHeader>
      </MDBRow>
      <MDBRow>
        {isLoading ? (
          <ComponentLoaderCenter />
        ) : (
          <>
            <div className="pl-5 pt-3 ml-5">
              {serpPages.map((page, idx) => {
                return (
                  <SearchResult
                    key={idx}
                    title={page.title}
                    snippet={page.snippet}
                    url={page.url}
                    linkedPages={page.linkedPages}
                  />
                );
              })}
            </div>
            <div className="mt-3 ml-3">
              <MDBCard className="position-fixed border border-dark m-3 rounded-lg" style={{ width: '400px' }}>
                <MDBCardBody>
                  <MDBCardTitle>タスク内容</MDBCardTitle>
                  <SizedText size="14px">
                    リモートでのやり取りが増えたので、ウェブカメラの購入を考えています。
                    次に表示される検索結果から、自分が購入したいウェブカメラを選択してください。
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
                        検索タスクの終了時には「購入したいと思った商品名」「一番参考になったページのURL」「決め手となった理由」の3点をお尋ねします。
                      </SizedText>
                    </li>
                    <li>
                      <SizedText size="13px">制限時間はありませんので、納得のいくまで検索を行ってください。</SizedText>
                    </li>
                  </MDBTypography>
                  <MDBBtn onClick={() => toggle(!isOpen)}>回答する</MDBBtn>
                </MDBCardBody>
              </MDBCard>
              <ConfirmPopup isOpen={isOpen} toggle={toggle} confirmationCallback={() => setPage('PostTask')} />
            </div>
          </>
        )}
      </MDBRow>
    </>
  );
};
