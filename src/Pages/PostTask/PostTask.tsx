import Box from '@mui/material/Box';
import React, { useState } from 'react';

import Button from 'Components/Button';
import Container from 'Components/Container';
import Paragraph from 'Components/Paragraph';
import { getPostTaskEnqueteByGroupId, getUserId } from 'shared/utils';

export const PostTask: React.FC = () => {
  const [clicked, isClicked] = useState<boolean>(false);
  const group = localStorage.getItem('group') || '';
  const enquete = getPostTaskEnqueteByGroupId(group);
  const user = getUserId();

  return (
    <Container>
      {/* 事後アンケートの説明段落 */}
      <h1>事後アンケート</h1>
      <Paragraph>事後アンケートにお答えください。質問は全部で15問あり、想定所要時間は約5分です。</Paragraph>

      {/* 注意事項の段落 */}
      <h2 className="mt-5">注意事項</h2>
      <Paragraph>
        アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
        <strong>開いたままに</strong>してください。
        アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面から実験を再開してください。
      </Paragraph>

      {/* アンケートページへの遷移ボタン */}
      <Box sx={{ my: '24px', display: 'flex', justifyContent: 'center' }}>
        <a href={enquete + user} target="_blank" rel="noopener noreferrer">
          <Button disabled={clicked} onClick={() => isClicked(true)}>
            アンケートページへ
          </Button>
        </a>
      </Box>

      {/* アンケート後の指示 */}
      <Paragraph>実験は以上で終了となります。以下のボタンをクリックして完了コードを発行してください。</Paragraph>

      {/* 完了コード発行ページへの遷移ボタン */}
      <Box sx={{ my: '24px', display: 'flex', justifyContent: 'center' }}>
        <a href="/compCode">
          <Button disabled={!clicked}>完了コード発行</Button>
        </a>
      </Box>
    </Container>
  );
};
