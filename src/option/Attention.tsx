import React from 'react';
import { MDBContainer, MDBBtn, MDBTypography } from 'mdbreact';

type Pages = 'Attention' | 'Introduntion' | 'PreTask' | 'Task' | 'PostTask';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Attention: React.FC<Props> = ({ setPage }) => {
  return (
    <MDBContainer>
      <MDBTypography tag="h1" className="mt-4">
        はじめに
      </MDBTypography>
      <MDBTypography tag="p">
        この度は実験にご協力いただきありがとうございます。タスクを始めるに当たり、注意事項がありますので確認の上次に進んでください。
      </MDBTypography>
      <MDBTypography tag="h2" className="mt-4">
        注意事項
      </MDBTypography>
      <MDBTypography tag="p" className="lead">
        <MDBTypography tag="ul">
          <li>
            実験中はブラウザの「戻る」及び「進む」の動作を行わないでください。実験が正しく行われない可能性があります。
          </li>
        </MDBTypography>
      </MDBTypography>
      <MDBTypography tag="p" className="my-5">
        上記の注意事項を確認し、実験に参加してくださる場合は以下のボタンから「タスク詳細」ページへ進んでください。
      </MDBTypography>
      <MDBBtn color="primary" className="float-left disabled" onClick={() => setPage('Introduntion')}>
        タスク詳細へ
      </MDBBtn>
      <MDBBtn color="primary" className="float-right" onClick={() => setPage('Introduntion')}>
        タスク詳細へ
      </MDBBtn>
    </MDBContainer>
  );
};
