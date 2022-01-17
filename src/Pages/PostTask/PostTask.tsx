import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { getPostTaskEnqueteByGroupId, getUserId } from 'shared/utils';

export const PostTask: React.FC = () => {
  const [clicked, isClicked] = useState<boolean>(false);
  const group = localStorage.getItem('group') || '';
  const enquete = getPostTaskEnqueteByGroupId(group);
  const user = getUserId();

  return (
    <Container className="my-5">
      <h1>事後アンケート</h1>
      <p>事後アンケートにお答えください。質問は全部で15問あり、想定所要時間は約5分です。</p>
      <h2 className="mt-5">注意事項</h2>
      <p>
        アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
        <strong className="font-weight-bold">開いたままに</strong>してください。
      </p>
      <p>
        アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面から実験を再開してください。
      </p>
      <a className="white-text" href={enquete + user} target="_blank" rel="noopener noreferrer">
        <Button color="primary" className={`${!clicked ? '' : 'disabled'} mb-5`} onClick={() => isClicked(true)}>
          アンケートページへ
        </Button>
      </a>
      <p>実験は以上で終了となります。以下のボタンをクリックして完了コードを発行してください。</p>
      <a href="/compCode" className="white-text">
        <Button color="primary" className={`${clicked ? '' : 'disabled'} mb-5`}>
          完了コード発行
        </Button>
      </a>
    </Container>
  );
};
