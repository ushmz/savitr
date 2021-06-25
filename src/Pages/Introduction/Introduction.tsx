import React from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';

import { SizedText } from '../../Components/AdjustedComponents';
import { TaskInfo } from 'shared/apis/apis';

export const Introduction: React.FC<TaskInfo> = (props) => {
  return (
    <MDBContainer className="my-5">
      <h1 className="mt-5">タスク内容</h1>
      <SizedText size="18px" className="font-weight-bold lead">
        {props.description}
      </SizedText>
      <h2 className="mt-5">注意事項</h2>
      <ul>
        <li>・検索キーワードは変更できません。</li>
        <li>
          ・表示された検索結果リスト及び、そのリンク先のページのみ閲覧してください。検索結果は新規タブで開かれます。
        </li>
        <li>・検索タスクの終了時には質問の回答と、その理由をお尋ねしますので、ご準備をお願いします。</li>
        <li>・制限時間はありませんので、納得のいくまで検索を行ってください。</li>
        <li>
          表示されるリストとそこからリンクされたページの情報のみを用いてタスクを行ってください。Google検索やYahoo検索を使わずにタスクを行ってください。
        </li>
        <li>タスクの回答は画面右側の「提出」ボタンから提出してください。</li>
      </ul>
      {/* TODO: 表示する条件をどこで判断するか，そもそも表示するか． */}
      <h2 className="mt-5">検索結果リストについて</h2>
      <p>
        次に表示される画面では、Google検索やYahoo検索のような検索エンジンの結果ページを模したページが表示されます。
        各検索結果には、そのページを閲覧することで第三者に知られてしまう可能性のあるウェブページが表示されることがあります。
      </p>
      <h2 className="mt-5">留意事項</h2>
      <p>
        タスク中、ページ閲覧ログを収集させていただきます。収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
      </p>
      <MDBRow className="my-5">
        <MDBCol>
          <p className="font-weight-bold">第三者に知られてしまう可能性のある情報がない場合</p>
          <img src="/img/samples/sample_result_unlinked.png" className="img-fluid z-depth-1" alt="" />
        </MDBCol>
        <MDBCol>
          <p className="font-weight-bold">第三者に知られてしまう可能性のある情報がある場合</p>
          <img src="/img/samples/sample_result_linked.png" className="img-fluid z-depth-1" alt="" />
        </MDBCol>
      </MDBRow>
      <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
        <MDBBtn color="primary" className="float-right">
          タスクを開始する
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};
