import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import React, { useState } from 'react';
import { Pages } from '../shared/types';

type Props = {
  answer: string;
  isOpen: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  goto: Pages;
};

// TODO: Send answers to log server
export const ConfirmPopup: React.FC<Props> = ({ answer, isOpen, toggle, setPage, goto }) => {
  const [name, setName] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  return (
    <MDBContainer>
      <MDBModal
        isOpen={isOpen}
        toggle={() => toggle(!isOpen)}
        size="md"
        // Following three props are not neccesary, but w/o these, cause error.
        inline={false}
        noClickableBodyWithoutBackdrop={false}
        overflowScroll={true}
      >
        <MDBModalHeader toggle={() => toggle(!isOpen)}></MDBModalHeader>
        <MDBModalBody>
          <form>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="productName">
                {answer}
              </label>
              <input
                type="text"
                id="productName"
                value={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="reason">
                理由
              </label>
              <textarea
                className="form-control"
                id="reason"
                value={reason}
                rows={4}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
          </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" className="float-left" onClick={() => toggle(!isOpen)}>
            キャンセル
          </MDBBtn>
          <MDBBtn
            disabled={name !== '' && reason !== '' ? false : true}
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.className += ' was-validated';
              toggle(!isOpen);
              setPage(goto);
            }}
          >
            検索タスクを終了する
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};
