import React from 'react';
import { MDBContainer, MDBBtn, MDBTypography } from 'mdbreact';

type Pages = 'Attention' | 'Introduntion' | 'PreTask' | 'Task' | 'PostTask';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Attention: React.FC<Props> = ({ setPage }) => {
  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">はじめに</MDBTypography>
      <MDBTypography tag="p">
        この度は実験にご協力いただきありがとうございます。タスクを始めるに当たり、注意事項がありますので確認の上次に進んでください。
      </MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        注意事項
      </MDBTypography>
      <MDBTypography tag="p" className="lead">
        実験中はブラウザの「進む・戻る」及び「再読み込み」の動作を行わないでください。実験が正しく行われない可能性があります。
      </MDBTypography>
      <MDBTypography tag="p" className="my-5">
        上記の注意事項を確認し、実験に参加してくださる場合は以下のボタンから「タスク詳細」ページへ進んでください。
      </MDBTypography>
      <MDBBtn color="primary" className="float-right" onClick={() => setPage('Introduntion')}>
        タスク詳細へ
      </MDBBtn>
    </MDBContainer>
  );
};
