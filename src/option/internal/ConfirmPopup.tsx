import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import React from 'react';

type Props = {
  isOpen: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  confirmationCallback: () => void;
};

export const ConfirmPopup: React.FC<Props> = ({ isOpen, toggle, confirmationCallback }) => {
  return (
    <MDBContainer>
      <MDBModal
        isOpen={isOpen}
        toggle={() => toggle(!isOpen)}
        size="md"
        // Following three props are not neccesary, but w/o these, cause error.
        inline={false}
        noClickableBodyWithoutBackdrop={false}
        overflowScroll={false}
      >
        <MDBModalHeader toggle={() => toggle(!isOpen)}></MDBModalHeader>
        <MDBModalBody>
          <form>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="productName">
                商品名
              </label>
              <input type="text" id="productName" className="form-control" />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="pageURL">
                決め手になったページのURL
              </label>
              <input type="text" id="pageURL" className="form-control" />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="reason">
                選択した理由
              </label>
              <textarea className="form-control" id="reason" rows={4}></textarea>
            </div>
          </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" className="float-left" onClick={() => toggle(!isOpen)}>
            キャンセル
          </MDBBtn>
          <MDBBtn color="primary" onClick={confirmationCallback}>
            検索タスクを終了する
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};
