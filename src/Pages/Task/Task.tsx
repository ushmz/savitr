import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBPagination,
  MDBIcon,
  MDBRow,
  MDBTypography,
  MDBPageItem,
  MDBPageNav,
} from 'mdbreact';
import React, { Dispatch, useState, SetStateAction } from 'react';
// import ReactPaginate from 'react-paginate';
// import { SERPElement } from '../../shared/types';
import { SearchResult } from '../../Components/SearchResult';
import { SearchHeader } from '../../Components/SearchBar';
import { ComponentLoaderCenter } from '../../Components/ComponentLoader';
import { ConfirmPopup } from '../../Components/ConfirmPopup';
import { SizedText } from '../../Components/AdjustedComponents';
import { Serp, TaskInfo } from '../../shared/apis/apis';

type Props = {
  isLoading: boolean;
  serpPages: Serp[];
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  getTimeOnPage: () => number;
  task: TaskInfo;
};

export const Task: React.FC<Props> = ({ isLoading, serpPages, offset, setOffset, getTimeOnPage, task }) => {
  const [isOpen, toggle] = useState<boolean>(false);

  const totalRecords = serpPages.length;
  const pageLimits = 10;
  const pageNeighbours = 1;
  const totalPages = Math.ceil(totalRecords / pageLimits);

  return (
    <>
      <MDBRow>
        <SearchHeader title="Custom Search" placeholder={task.query}></SearchHeader>
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
                    rank={idx + 1}
                    pageOnSerp={offset + 1}
                    task={task}
                    page={page}
                    getTimeOnPage={getTimeOnPage}
                    visible={idx % 2 != 0}
                  />
                );
              })}
            </div>
            <div className="mt-3 ml-3">
              <MDBCard className="position-fixed border border-dark m-3 rounded-lg" style={{ width: '400px' }}>
                <MDBCardBody>
                  <MDBCardTitle>タスク内容</MDBCardTitle>
                  <SizedText size="14px">{task.title}</SizedText>
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
                      <SizedText size="13px">検索タスクの終了時には理由をお尋ねします。</SizedText>
                    </li>
                    <li>
                      <SizedText size="13px">制限時間はありませんので、納得のいくまで検索を行ってください。</SizedText>
                    </li>
                  </MDBTypography>
                  <MDBBtn
                    onClick={() => {
                      /*toggle(!isOpen)*/
                    }}
                  >
                    回答する
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
              <ConfirmPopup answer="商品名" isOpen={isOpen} toggle={toggle} linkTo={'/'} />
            </div>
          </>
        )}
      </MDBRow>

      <div className="px-5 py-5">
        <MDBPagination>
          <MDBPageItem disabled={offset <= 1}>
            <MDBPageNav onClick={() => setOffset(offset - 1)}>
              <MDBIcon icon="angle-double-left" />
            </MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(1)}>1</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(2)}>2</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(3)}>3</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(4)}>4</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(5)}>5</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(6)}>6</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(7)}>7</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(8)}>8</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav onClick={() => setOffset(9)}>9</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem disabled={offset > 10} onClick={() => setOffset(offset + 1)}>
            <MDBPageNav>
              <MDBIcon icon="angle-double-right" />
            </MDBPageNav>
          </MDBPageItem>
        </MDBPagination>
      </div>
    </>
  );
};
