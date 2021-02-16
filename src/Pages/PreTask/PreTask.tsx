import { MDBContainer, MDBTypography, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PreTask: React.FC = () => {
  const [clicked, isClicked] = useState<boolean>(false);

  const uid = localStorage.getItem('uid');

  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">事前アンケート</MDBTypography>
      <MDBTypography tag="p">
        タスクを行う前に事前のアンケートにお答えください。質問は全部で17問あり、想定所要時間は約5分です。
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
        // Or import from `src/shared/config.ts`
        href={`https://docs.google.com/forms/d/e/1FAIpQLSfhI4bdPXmMI1ojima5_EXJfvNVBNKzHe92gJsUZevOOc223g/viewform?usp=pp_url&entry.1200052101=${uid}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MDBBtn color="primary" className="mb-5" onClick={() => isClicked(true)}>
          アンケートページへ
        </MDBBtn>
      </a>
      <MDBTypography tag="p">
        アンケートへの回答が終了しましたら、以下のボタンから「タスク説明」ページへ進んでください。
      </MDBTypography>
      <Link to="/introduction/1">
        <MDBBtn color="primary" className={`${clicked ? '' : 'disabled'}`}>
          タスク説明へ
        </MDBBtn>
      </Link>
    </MDBContainer>
  );
};
