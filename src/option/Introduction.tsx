import React from 'react';
import { MDBContainer, MDBTypography, MDBBtn } from 'mdbreact';
import 'react-toastify/dist/ReactToastify.css';

import { SetPageProp } from '../shared/types';

export const Introduction: React.FC<SetPageProp> = ({ setPage }) => {
  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">タスク詳細</MDBTypography>
      <MDBTypography tag="p">このページでは検索タスクの詳細について説明します。</MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        タスク内容
      </MDBTypography>
      <MDBTypography tag="p">
        リモートでのやり取りが増えたので、ウェブカメラを購入したいと思ったとします。
        どれを購入するか迷ったあなたは、ひとまずウェブカメラについての情報収集のために、ウェブ検索することにしました。
        タスク画面では、「ウェブカメラ おすすめ」というワードでウェブ検索した際の検索結果画面を想定し、
        自分が購入したいウェブカメラを検索してください。自分が購入したいウェブカメラが決まったら検索を終了してください。
      </MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        注意事項
      </MDBTypography>
      <MDBTypography tag="ul">
        <li>検索クエリは変更できません。</li>
        <li>
          検索結果は新規タブで開かれます。自由に閲覧していただいて構いませんが、新たなリンクをたどることはしないでください。
        </li>
        <li>
          検索タスクの終了時には「購入したいと思った商品名」「一番参考になったページのURL」「決め手となった理由」
          の3点をお尋ねしますので、ご準備をお願いします。
        </li>
        <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
      </MDBTypography>
      <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
        <MDBBtn color="primary" className="float-right" onClick={() => setPage('Task')}>
          タスクを開始する
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};
