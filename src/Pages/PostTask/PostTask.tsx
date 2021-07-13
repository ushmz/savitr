import React, { useState } from 'react';
import { MDBContainer, MDBBtn } from 'mdbreact';
import { getPostTaskEnqueteByGroupId, getUserId } from '../../shared/util';

export const PostTask: React.FC = () => {
  const [clicked, isClicked] = useState<boolean>(false);
  const group = localStorage.getItem('group') || '';
  const enquete = getPostTaskEnqueteByGroupId(group);
  const user = getUserId();

  return (
    <MDBContainer className="my-5">
      <h1>事後アンケート</h1>
      <p>事後アンケートにお答えください。質問は全部で17問あり、想定所要時間は約5分です。</p>
      <h2 className="mt-5">注意事項</h2>
      <p>
        アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
        <strong className="font-weight-bold">開いたままに</strong>してください。
      </p>
      <p>
        アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面から実験を再開してください。
      </p>
      <a className="white-text" href={enquete + user} target="_blank" rel="noopener noreferrer">
        <MDBBtn color="primary" className="mb-5" onClick={() => isClicked(true)}>
          アンケートページへ
        </MDBBtn>
      </a>
      <p>実験は以上で終了となります。以下のボタンをクリックして完了コードを発行してください。</p>
      <a href="/compCode" className="white-text">
        <MDBBtn color="primary" className={`${clicked ? '' : 'disabled'} mb-5`}>
          完了コード発行
        </MDBBtn>
      </a>
    </MDBContainer>
  );
};
