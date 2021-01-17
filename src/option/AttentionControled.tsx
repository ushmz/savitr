import React from 'react';
import { MDBContainer, MDBBtn, MDBTypography } from 'mdbreact';
import { initializeSERP } from '../repository/serpIDB';
import { SetPageProp } from '../shared/types';

export const Attention: React.FC<SetPageProp> = ({ setPage }) => {
  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">はじめに</MDBTypography>
      <MDBTypography tag="p">
        この度は実験にご協力いただきありがとうございます。
        本実験では、ウェブ検索ユーザのプライバシーリスクへの意識づけを支援する提案インターフェースを検証するためのものです。
        はじめに、プライバシー意識を測るアンケートに回答していただきます。続いて検索タスクを行っていただきます。
      </MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        注意事項
      </MDBTypography>
      <MDBTypography tag="ul">
        <li className="my-3">
          実験中はブラウザの「進む・戻る」及び「再読み込み」の動作を行わないでください。実験が正しく行われない可能性があります。
        </li>
        <li className="my-3">
          タスクの実行中、結果の分析のため、以下の情報を収集させていただきます。なお、以下の情報によっていかなる個人の特定も行われることはありません。
          <ol>
            <li>
              あなたが<strong className="font-weight-bold">実験中に</strong>閲覧したページのタイトル及び内容
            </li>
            <li>
              検索タスクの<strong className="font-weight-bold">所要時間</strong>
            </li>
            <li>
              検索結果画面の<strong className="font-weight-bold">閲覧時間</strong>
            </li>
          </ol>
        </li>
      </MDBTypography>
      <MDBTypography tag="p">ご確認いただけましたら、「事前アンケート」ページへ進んでください。</MDBTypography>
      <MDBBtn
        color="primary"
        className="float-right"
        onClick={async () => {
          await initializeSERP('webcam', 'webcam').then(async () => await initializeSERP('tounyou', 'tounyou'));
          setPage('PreTask');
        }}
      >
        「事前アンケート」へ
      </MDBBtn>
    </MDBContainer>
  );
};
