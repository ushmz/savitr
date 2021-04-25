import { MDBContainer, MDBCard } from 'mdbreact';
import React from 'react';
import { Header } from '../../Components/Header';

type Props = {
  compCode: number;
};

export const Completion: React.FC<Props> = ({ compCode }) => {
  return (
    <>
      <Header />
      <MDBContainer className="my-5">
        <p>閲覧履歴の提供ありがとうございます。あなたの完了コードは以下になります。</p>
        <MDBCard className="mx-auto my-5" style={{ width: '22rem' }}>
          <p className="m-auto" style={{ fontSize: '3rem' }}>
            {compCode}
          </p>
        </MDBCard>
        <p>
          この完了コードをランサーズの作業画面の「タスク完了コード」の欄に入力してください。
          一度この画面を離れると、この画面は表示されませんので、忘れないようにメモなどをお願いいたします。
        </p>
      </MDBContainer>
    </>
  );
};
