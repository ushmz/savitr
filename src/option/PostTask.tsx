import React, { useState } from 'react';
import { MDBContainer, MDBTypography, MDBBtn } from 'mdbreact';
import { dropAllDatabase } from '../service/indexedDB';

type Pages = 'Attention' | 'Introduntion' | 'PreTask' | 'Task' | 'PostTask';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const PostTask: React.FC<Props> = ({ setPage }) => {
  const [clicked, isClicked] = useState<boolean>(false);

  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">事後アンケート</MDBTypography>
      <MDBTypography tag="p">
        事後アンケートにお答えください。質問は全部で48問あり、想定所要時間は{}分です。
      </MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        注意事項
      </MDBTypography>
      <MDBTypography tag="p" className="lead">
        <MDBTypography tag="ul">
          <li>
            アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
            <text className="font-weight-bold">開いたままに</text>してください。
          </li>
          <li>
            アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面から実験を再開してください。
          </li>
        </MDBTypography>
      </MDBTypography>
      <MDBBtn color="primary" className="mb-5" onClick={() => isClicked(true)}>
        <a className="white-text" href="https://forms.gle/emKsudDBaUHPaGcq5" target="_blank" rel="noopener noreferrer">
          アンケートページへ
        </a>
      </MDBBtn>
      <MDBTypography tag="p">
        アンケートへの回答が終了しましたら、以下のボタンから実験に使用した履歴情報の削除を行ってください。
      </MDBTypography>
      <MDBBtn color="primary" className="mb-5" onClick={async () => await dropAllDatabase()}>
        履歴情報の削除
      </MDBBtn>
      <MDBTypography tag="p">
        実験は以上で終了となります。ご協力ありがとうございました。このタブを閉じ、本システムをアンインストールしてください。
      </MDBTypography>
    </MDBContainer>
  );
};
