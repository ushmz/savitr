import { MDBContainer, MDBTypography, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { SetPageProp } from '../shared/types';

export const PreTask: React.FC<SetPageProp> = ({ setPage }) => {
  const [clicked, isClicked] = useState<boolean>(false);

  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">事前アンケート</MDBTypography>
      <MDBTypography tag="p">
        タスクを行う前に事前のアンケートにお答えください。質問は全部で48問あり、想定所要時間は10分です。
      </MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        注意事項
      </MDBTypography>
      <MDBTypography tag="p" className="lead">
        アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
        <strong className="font-weight-bold">開いたままに</strong>してください。
        アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面から実験を再開してください。
      </MDBTypography>
      <MDBBtn color="primary" className="mb-5" onClick={() => isClicked(true)}>
        <a className="white-text" href="https://forms.gle/emKsudDBaUHPaGcq5" target="_blank" rel="noopener noreferrer">
          アンケートページへ
        </a>
      </MDBBtn>
      <MDBTypography tag="p">
        アンケートへの回答が終了しましたら、以下のボタンから「タスク」ページへ進んでください。
      </MDBTypography>
      <MDBBtn color="primary" className="float-left disabled" onClick={() => setPage('Introduntion')}>
        タスク詳細へ
      </MDBBtn>
      <MDBBtn color="primary" className={`float-right ${clicked ? '' : 'disabled'}`} onClick={() => setPage('Task')}>
        タスクへ
      </MDBBtn>
    </MDBContainer>
  );
};
