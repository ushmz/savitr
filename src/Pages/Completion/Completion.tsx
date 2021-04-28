import { MDBContainer, MDBCard, MDBBtn } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from 'shared/provider/authProvider';
import { Header } from '../../Components/Header';

type Props = {
  compCode: number;
};

export const Completion: React.FC<Props> = ({ compCode }) => {
  const auth = useAuth();
  const history = useHistory();
  return (
    <>
      <Header />
      <MDBContainer className="my-5">
        <p>閲覧履歴の提供ありがとうございます。あなたの完了コードは以下になります。</p>
        <MDBCard className="mx-auto my-5" style={{ width: '22rem' }}>
          <p className="m-auto" style={{ fontSize: '3rem' }}>
            {compCode}
          </p>
        </MDBCard>
        <p>
          この完了コードをランサーズの作業画面の「タスク完了コード」の欄に入力してください。
          一度この画面を離れると、この画面は表示されませんので、忘れないようにメモなどをお願いいたします。
        </p>
        <p>完了コードを記録したら、以下のボタンをクリックして、タスクを終了してください。</p>
        <MDBBtn
          className="white-text"
          onClick={() => {
            auth.signOut();
            localStorage.removeItem('jwt');
            history.push('/');
          }}
        >
          タスクを終了する
        </MDBBtn>
      </MDBContainer>
    </>
  );
};
