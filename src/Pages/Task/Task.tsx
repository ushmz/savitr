import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBTypography } from 'mdbreact';
import React, { useState } from 'react';
import { SERPElement } from '../../shared/types';
import { SearchResult } from '../../Components/SearchResult';
import { SearchHeader } from '../../Components/SearchBar';
import { ComponentLoaderCenter } from '../../Components/ComponentLoader';
import { ConfirmPopup } from '../../Components/ConfirmPopup';
import { SizedText } from '../../Components/AdjustedComponents';

type Props = {
  isLoading: boolean;
  serpPages: SERPElement[];
  getTimeOnPage: () => number;
  task: {
    id: number;
    slug: string;
    task: string;
    requiements: string[];
    placeholder: string;
  };
};

// TODO: User react-router
export const Task: React.FC<Props> = ({ isLoading, serpPages, getTimeOnPage, task }) => {
  const [isOpen, toggle] = useState<boolean>(false);
  const linkTo = task.id === 1 ? '/introduction/2' : '/posttask';

  return (
    <>
      <MDBRow>
        <SearchHeader title="Custom Search" placeholder={task.placeholder}></SearchHeader>
      </MDBRow>
      <MDBRow className="pt-5">
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
                    getTimeOnPage={getTimeOnPage}
                    taskName={task.slug}
                  />
                );
              })}
            </div>
            <div className="mt-3 ml-3">
              <MDBCard className="position-fixed border border-dark m-3 rounded-lg" style={{ width: '400px' }}>
                <MDBCardBody>
                  <MDBCardTitle>タスク内容</MDBCardTitle>
                  <SizedText size="14px">{task.task}</SizedText>
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
                        検索タスクの終了時には
                        {task.requiements.map((r) => {
                          // eslint-disable-next-line react/jsx-key
                          return <strong className="font-weight-bold">{`「${r}」`}</strong>;
                        })}
                        の{task.requiements.length}点を お尋ねします。
                      </SizedText>
                    </li>
                    <li>
                      <SizedText size="13px">制限時間はありませんので、納得のいくまで検索を行ってください。</SizedText>
                    </li>
                  </MDBTypography>
                  <MDBBtn onClick={() => toggle(!isOpen)}>回答する</MDBBtn>
                </MDBCardBody>
              </MDBCard>
              <ConfirmPopup answer="商品名" isOpen={isOpen} toggle={toggle} linkTo={linkTo} />
            </div>
          </>
        )}
      </MDBRow>
    </>
  );
};
