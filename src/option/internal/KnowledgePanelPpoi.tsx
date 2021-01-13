import { MDBCard, MDBCardBody, MDBCardTitle, MDBTypography, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { ConfirmPopup } from './ConfirmPopup';

type Props = {
  taskDescription: string;
  confirmationCallback: () => void;
};

export const KnowledgePanelPpoi: React.FC<Props> = ({ taskDescription, confirmationCallback }) => {
  const [isOpen, toggle] = useState<boolean>(false);

  return (
    <>
      <MDBCard className="position-fixed">
        <MDBCardBody>
          <MDBCardTitle>タスク内容</MDBCardTitle>
          <MDBTypography tag="p">{taskDescription} </MDBTypography>
          <MDBTypography tag="ul">
            <li>検索クエリは変更できません。</li>
            <li>
              検索結果は新規タブで開かれます。自由に閲覧していただいて構いませんが、新たなリンクをたどることはしないでください。
            </li>
            <li>
              検索タスクの終了時には「購入したいと思った商品名」「一番参考になったページのURL」「決め手となった理由」
              の3点をお尋ねします。
            </li>
            <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
          </MDBTypography>
          <MDBBtn onClick={() => toggle(!isOpen)}>回答する</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <ConfirmPopup isOpen={isOpen} toggle={toggle} confirmationCallback={confirmationCallback} />
    </>
  );
};
