import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import React from 'react';

import Container from 'Components/Container';
import Paragraph from 'Components/Paragraph';
import { CROWDSOURCING_SITE } from 'shared/config';

type Props = {
  compCode: number;
};

export const Completion: React.FC<Props> = ({ compCode }) => {
  return (
    <Container>
      <Paragraph>タスクへのご協力ありがとうございます。あなたの完了コードは以下になります。</Paragraph>
      <Box sx={{ my: '24px', display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: '22rem' }}>
          <Typography variant="h2" align="center">
            {compCode}
          </Typography>
        </Card>
      </Box>
      <Paragraph>
        この完了コードを{CROWDSOURCING_SITE}の作業画面の「タスク完了コード」の欄に入力してください。
        完了コードを記録したら、この画面を閉じていただいて問題ありません。
      </Paragraph>
      <Paragraph>
        一度この画面を離れると、この画面は<strong>表示されません</strong>
        ので、忘れないようにメモなどをお願いいたします。
      </Paragraph>
    </Container>
  );
};
