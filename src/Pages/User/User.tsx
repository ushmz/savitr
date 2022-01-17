import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'shared/provider/authProvider';

export const User: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();
  return (
    <Container className="mt-5">
      {auth.user?.email?.split('@')[0]} さん。実験協力ありがとうございます。
      <p>履歴情報のアップロードはこちらからお願いいたします。</p>
      <Button color="primary" onClick={() => history.push('/user/upload')}>
        アップロード
      </Button>
    </Container>
  );
};
