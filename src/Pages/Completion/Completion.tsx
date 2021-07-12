import React from 'react';
import { MDBContainer, MDBCard } from 'mdbreact';

type Props = {
  compCode: number;
};

export const Completion: React.FC<Props> = ({ compCode }) => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('condition');
  localStorage.removeItem('group');
  localStorage.removeItem('user');
  return (
    <>
      <MDBContainer className="my-5">
        <p>タスクへのご協力ありがとうございます。あなたの完了コードは以下になります。</p>
        <MDBCard className="mx-auto my-5" style={{ width: '22rem' }}>
          <p className="m-auto" style={{ fontSize: '3rem' }}>
            {compCode}
          </p>
        </MDBCard>
        <p>この完了コードをランサーズの作業画面の「タスク完了コード」の欄に入力してください。</p>
        <p>一度この画面を離れると、この画面は表示されませんので、忘れないようにメモなどをお願いいたします。</p>
        <p>完了コードを記録したら、この画面を閉じていただいて問題ありません。</p>
      </MDBContainer>
    </>
  );
};
