import React from 'react';
import { MDBContainer, MDBTypography, MDBBtn } from 'mdbreact';
import 'react-toastify/dist/ReactToastify.css';

import { SetPageProp } from '../../shared/types';
import { SizedText } from '../internal/AdjustedComponents';

export const SecondaryIntroduction: React.FC<SetPageProp> = ({ setPage }) => {
  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">タスク詳細</MDBTypography>
      <MDBTypography tag="p">このページでは検索タスクの詳細について説明します。</MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        タスク内容
      </MDBTypography>
      <SizedText size="18px" className="font-weight-bold lead">
        「すぐに喉が渇く」「動悸・息切れ」などの症状は糖尿病に該当するか調べてください。
      </SizedText>
      <MDBTypography tag="h2" className="mt-5">
        注意事項
      </MDBTypography>
      <MDBTypography tag="ul">
        <li>検索クエリは変更できません。</li>
        <li>
          表示された検索結果リスト及び、そのリンク先のページのみ閲覧してください。検索結果は新規タブで開かれます。
        </li>
        <li>
          検索タスクの終了時には「糖尿病に該当するか」「決め手となった理由」
          の2点をお尋ねしますので、ご準備をお願いします。
        </li>
        <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
      </MDBTypography>
      <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
        <MDBBtn color="primary" className="float-right" onClick={() => setPage('Task2')}>
          タスクを開始する
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};
