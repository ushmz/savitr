import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBBtn } from 'mdbreact';
import { getPreTaskEnqueteByGroupId } from '../../shared/util';

export const PreTask: React.FC = () => {
  const [clicked, isClicked] = useState<boolean>(false);
  const history = useHistory();

  const group = localStorage.getItem('group') || '';

  const enquete = getPreTaskEnqueteByGroupId(group);

  return (
    <MDBContainer className="my-5">
      <h1>事前アンケート</h1>
      <p>タスクを行う前に事前のアンケートにお答えください。質問は全部で17問あり、想定所要時間は約5分です。</p>
      <h2 className="mt-5">注意事項</h2>
      <p>
        アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
        <strong className="font-weight-bold">開いたままに</strong>してください。
      </p>
      <p>
        アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面からタスクを再開してください。
      </p>
      <a className="white-text" href={enquete} target="_blank" rel="noopener noreferrer">
        <MDBBtn color="primary" className="mb-5" onClick={() => isClicked(true)}>
          アンケートページへ
        </MDBBtn>
      </a>
      <p>アンケートへの回答が終了しましたら、以下のボタンから「タスク説明」ページへ進んでください。</p>
      <MDBBtn
        color="primary"
        className={`${clicked ? '' : 'disabled'}`}
        onClick={() => {
          const sb = localStorage.getItem('standby');
          if (sb) {
            localStorage.removeItem('standby');
            history.push(`/introduction/${sb}`);
          } else {
            history.push('/404');
          }
        }}
      >
        タスク説明へ
      </MDBBtn>
    </MDBContainer>
  );
};
