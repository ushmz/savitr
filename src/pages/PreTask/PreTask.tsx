import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Container from 'components/Container';
import Paragraph from 'components/Paragraph';
import { getGroupID, getPreTaskEnqueteURLByGroupId, getPrimaryTaskID, getUserID } from 'shared/utils';

export const PreTask: React.FC = () => {
  const [clicked, isClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  const group = getGroupID();
  const enquete = getPreTaskEnqueteURLByGroupId(group);
  const user = getUserID();

  return (
    <Container>
      {/* 事前アンケートの説明段落 */}
      <h1>事前アンケート</h1>
      <Paragraph>
        タスクを行う前に事前のアンケートにお答えください。質問は全部で2問あり、想定所要時間は約1分です。
      </Paragraph>

      {/* 注意事項の段落 */}
      <h2>注意事項</h2>
      <Paragraph>
        アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
        <strong>開いたままに</strong>してください。
        アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面からタスクを再開してください。
      </Paragraph>
      <Paragraph>アンケートページは一度閉じると、もう一度表示することはできません。</Paragraph>

      {/* アンケートページへの遷移ボタン */}
      <Box sx={{ my: '24px', display: 'flex', justifyContent: 'center' }}>
        <a href={enquete + user} target="_blank" rel="noopener noreferrer">
          <Button disabled={clicked} onClick={() => isClicked(true)}>
            アンケートページへ
          </Button>
        </a>
      </Box>

      {/* アンケート後の指示 */}
      <Paragraph>アンケートへの回答が終了しましたら、以下のボタンから「タスク説明」ページへ進んでください。</Paragraph>

      {/* タスク説明ページへの遷移ボタン */}
      <Box sx={{ my: '24px', display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={!clicked}
          onClick={() => {
            const sb = getPrimaryTaskID();
            if (sb) {
              navigate(`/introduction/${sb}`);
            } else {
              navigate('/404');
            }
          }}
        >
          タスク説明へ
        </Button>
      </Box>
    </Container>
  );
};
