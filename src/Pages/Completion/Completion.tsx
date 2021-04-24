import { MDBBtn, MDBIcon, MDBCol, MDBContainer, MDBRow, MDBCard } from 'mdbreact';
import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header } from '../../Components/Header';
import { fetchCompletionCode } from '../../shared/apis/apis';
import { useAuth } from '../../shared/provider/authProvider';
import { toast } from 'react-toastify';

type Props = {
  compCode: number;
};

export const Completion: React.FC<Props> = ({ compCode }) => {
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
          この完了コードをタスク完了画面に入力してください。
          一度この画面を離れると、この画面は表示されませんので、忘れないようにメモなどをお願いいたします。
        </p>
      </MDBContainer>
    </>
  );
};
