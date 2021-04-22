import { MDBBtn, MDBContainer } from 'mdbreact';
import React from 'react';
import { Header } from '../../Components/Header';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'shared/provider/authProvider';

export const User: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();
  return (
    <>
      <Header />
      <MDBContainer className="mt-5">
        {auth.user?.email?.split('@')[0]} さん。実験協力ありがとうございます。
        <p>履歴情報のアップロードはこちらからお願いいたします。</p>
        <MDBBtn color="primary" onClick={() => history.push('/user/upload')}>
          アップロード
        </MDBBtn>
      </MDBContainer>
    </>
  );
};
