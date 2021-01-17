import React from 'react';
import { MDBContainer, MDBTypography, MDBBtn } from 'mdbreact';
import 'react-toastify/dist/ReactToastify.css';

import { SetPageProp } from '../../shared/types';
import { SizedText } from '../internal/AdjustedComponents';

export const PrimaryIntroduction: React.FC<SetPageProp> = ({ setPage }) => {
  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">タスク詳細</MDBTypography>
      <MDBTypography tag="p">このページでは検索タスクの詳細について説明します。</MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        タスク内容
      </MDBTypography>
      <SizedText size="18px" className="font-weight-bold lead">
        リモートでのやり取りが増えたので、ウェブカメラの購入を考えています。
        次に表示される検索結果から、自分が購入したいウェブカメラを選択してください。
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
          検索タスクの終了時には「購入したいと思った商品名」「決め手となった理由」
          の2点をお尋ねしますので、ご準備をお願いします。
        </li>
        <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
      </MDBTypography>
      <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
        <MDBBtn color="primary" className="float-right" onClick={() => setPage('Task1')}>
          タスクを開始する
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};
