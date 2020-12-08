import React, { useState } from 'react';
import { MDBContainer, MDBTypography, MDBBox, MDBBtn } from 'mdbreact';

import { initializeTable, initializeHistory } from '../service/indexedDB';

type Pages = 'Attention' | 'Introduntion' | 'PreTask' | 'Task' | 'PostTask';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Introduction: React.FC<Props> = ({ setPage }) => {
  const [isReady, setReady] = useState<boolean>(false);

  return (
    <MDBContainer>
      <MDBTypography tag="h1" className="mt-4">
        タスク詳細
      </MDBTypography>
      <MDBTypography tag="p">このページではタスクの詳細について説明します。</MDBTypography>
      <MDBTypography tag="h2" className="mt-4">
        注意事項
      </MDBTypography>
      <MDBTypography tag="ul">
        <li className="my-3">
          本実験ではあなたのブラウザに保存された閲覧履歴データ（以下、ブラウザ履歴）にアクセスし、
          一部変更を加えた上でブラウザ内の一時的にアクセス可能な場所に保存します。本システムは
          一時的に保存された情報（以下、履歴情報）を用いてタスクを生成します。
          {/* TODO: 具体例 */}
          <text className="font-weight-bold">
            本システムはあなたのブラウザ履歴、及び履歴情報に対し、一切の閲覧、収集、外部への送信を行いません。
          </text>
        </li>
        <li className="my-3">
          タスクの実行中、結果の分析のため、以下の情報を収集させていただきます。なお、以下の情報によっていかなる個人の特定も行われることはありません。
          <ol>
            {/* TODO: 具体例 */}
            <li>
              あなたが<text className="font-weight-bold">実験中に</text>閲覧したページのタイトル及び内容
            </li>
            <li>
              あなたが閲覧したページに紐付けられた<text className="font-weight-bold">履歴情報の件数</text>
              （履歴情報の詳細については収集いたしません）
            </li>
          </ol>
        </li>
        <div style={{ padding: '10px' }}>
          <MDBTypography blockquote bqColor="primary">
            <MDBBox tag="p" className="bq-title">
              Notification
            </MDBBox>
            <p>上記の内容に対し不安がある場合は、いつでも実験への参加を辞退することができます。</p>
          </MDBTypography>
        </div>
      </MDBTypography>
      <MDBTypography tag="p">
        <text>
          上記の注意事項を確認し、実験にご協力して頂ける場合は、以下のボタンから実験用の履歴情報を作成してください。（PCに負荷がかかる場合があります。）
        </text>
      </MDBTypography>
      <div className="mx-auto my-3">
        <MDBBtn
          color="primary"
          // className="mx-auto"
          onClick={async () => {
            await initializeHistory();
            await initializeTable();
            setReady(true);
          }}
        >
          履歴情報の作成
        </MDBBtn>
      </div>
      <MDBTypography tag="p">「事前アンケート」ページへ進んでください。</MDBTypography>
      <MDBBtn color="primary" className="float-left disabled" onClick={() => setPage('Attention')}>
        「はじめに」へ
      </MDBBtn>
      <MDBBtn color="primary" className={`float-right ${isReady ? '' : 'disabled'}`} onClick={() => setPage('PreTask')}>
        「事前アンケート」へ
      </MDBBtn>
    </MDBContainer>
  );
};
