import React, { useState } from 'react';
import { MDBContainer, MDBTypography, MDBBtn } from 'mdbreact';
import 'react-toastify/dist/ReactToastify.css';
import { dropAllDatabase } from '../repository/xrayedIDB';

export const PostTask: React.FC = () => {
  const uid = localStorage.getItem('uid');

  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">事後アンケート</MDBTypography>
      <MDBTypography tag="p">
        事後アンケートにお答えください。質問は全部で17問あり、想定所要時間は約5分です。
      </MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        注意事項
      </MDBTypography>
      <MDBTypography tag="p">
        アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
        <strong className="font-weight-bold">開いたままに</strong>してください。
        アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面から実験を再開してください。
      </MDBTypography>
      <a
        className="white-text"
        href={`https://docs.google.com/forms/d/e/1FAIpQLSduKki4WZT5FUA_gWLqpmBbGsJSDk7tbDCa1ItXGfUjn1cYvQ/viewform?usp=pp_url&entry.183922479=${uid}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MDBBtn color="primary" className="mb-5" onClick={() => dropAllDatabase()}>
          アンケートページへ
        </MDBBtn>
      </a>
      <MDBTypography tag="p">
        実験は以上で終了となります。ご協力ありがとうございました。このタブを閉じ、本システムをアンインストールしてください。
      </MDBTypography>
    </MDBContainer>
  );
};
