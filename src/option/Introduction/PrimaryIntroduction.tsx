import React from 'react';
import { MDBContainer, MDBTypography, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
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
      <MDBTypography tag="h2" className="mt-5">
        検索結果下部の表示について
      </MDBTypography>
      <MDBTypography tag="p">
        次に表示される画面では、Google検索やYahoo検索エンジンのような検索結果ページを模したページが表示されます。
        各検索結果には、そのページを閲覧することで第三者に知られてしまう可能性のある閲覧履歴が表示されることがあります。
      </MDBTypography>
      <MDBRow className="my-5">
        <MDBCol>
          <p className="font-weight-bold">第三者に知られてしまう可能性のある情報がない場合</p>
          <img src="./img/sample_result_unlinked.png" className="img-fluid z-depth-1" alt="" />
        </MDBCol>
        <MDBCol>
          <p className="font-weight-bold">第三者に知られてしまう可能性のある情報がある場合</p>
          <img src="./img/sample_result_linked.png" className="img-fluid z-depth-1" alt="" />
        </MDBCol>
      </MDBRow>
      <MDBTypography tag="h3" className="mt-5">
        検出方法
      </MDBTypography>
      <MDBTypography tag="p">
        ウェブページには「cookie」と呼ばれる、情報を一時的に保存しておくための仕組みが用意されており、ログイン情報の記録などに使用されることがあります。
        しかし、情報を保存したウェブページ以外のページが内容を読み込める「サードパーティcookie」も存在しています。
        主な使用例は広告です。サードパーティcookieに閲覧したページの情報などを保存しておき、広告を表示させる際にそのcookieを読み込むことで、
        過去に閲覧したページを元に、より関連の高い広告を表示する仕組みがあります。実験システムでは過去に訪れたウェブページから
        サードパーティcookieを検出することで、紐付けられる情報を判定しています。
      </MDBTypography>
      <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
        <MDBBtn color="primary" className="float-right" onClick={() => setPage('Task1')}>
          タスクを開始する
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};
