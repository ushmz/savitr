import React, { useState } from 'react';
import { MDBBtn, MDBContainer } from 'mdbreact';

export const GoogleIshFooter: React.FC = () => {
  return (
    <>
      <link type="text/css" rel="stylesheet" href="css/googleish_footer.css" />
      <div id="bfoot">
        <span style={{ display: 'none' }}>
          <span style={{ display: 'none' }}></span>
        </span>
      </div>
      <div className="spch s2fp-h" style={{ display: 'none' }} id="spch">
        <button className="close-button" id="spchx" aria-label="閉じる">
          ×
        </button>
        <div className="spchc" id="spchc">
          <div className="inner-container">
            <div className="button-container">
              <span className="r8s4j" id="spchl"></span>

              <span className="button" id="spchb">
                <div className="microphone">
                  <span className="receiver"></span>

                  <div className="wrapper">
                    <span className="stem"></span>
                    <span className="shell"></span>
                  </div>
                </div>
              </span>
            </div>
            <div className="text-container">
              <span className="spcht" style={{ color: '#9aa0a6' }} id="spchi"></span>

              <span className="spcht" style={{ color: '#bdc1c6' }} id="spchf"></span>
            </div>
            <div className="google-logo"></div>
          </div>
          <div className="permission-bar">
            <div className="permission-bar-gradient"></div>
          </div>
        </div>
      </div>
      <div role="contentinfo">
        <h1 className="Uo8X3b OhScic zsYMMe">フッターのリンク</h1>
        <div id="footcnt">
          <div className="TCIIWe" style={{ height: '106px' }} id="fbarcnt">
            <div className="f6F9Be TrMVnc mSAqxd" id="fbar">
              <div className="fbar b2hzT">
                <div className="b0KoTc B4GxFc">
                  <span className="Q8LRLc">日本</span>
                  <div className="fbar smiUbb" style={{ visibility: 'visible' }} id="swml">
                    <span className="yLngu unknown_loc" id="EcMbV"></span>
                    <span id="Wprf1b">中区、静岡県浜松市</span>
                    <span id="VdZal"> - </span>
                    <span id="gc9Iqb">インターネット アドレスに基づく</span>
                    <a id="BHDErf" style={{ display: 'none' }}></a>
                    <span id="K3p6wc" style={{}}>
                      {' '}
                      -{' '}
                    </span>
                    <a href="#" id="eqQYZc" style={{}}>
                      正確な現在地を使用
                    </a>
                    <span id="swml_lmsep">&nbsp;-&nbsp;</span>
                    <a href="#">詳細</a>
                  </div>
                </div>
              </div>
              <div className="fbar">
                <span className="B4GxFc">
                  <span id="fsl">
                    <a className="JWaTvb Fx4vi" href="#">
                      ヘルプ
                    </a>
                    <a href="#" className="Fx4vi" id="dk2qOd" target="_blank">
                      フィードバックを送信
                    </a>
                    <a className="JWaTvb Fx4vi" href="#">
                      プライバシー
                    </a>
                    <a className="JWaTvb Fx4vi" href="#">
                      規約
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type ConfirmPopupProps = {
  answer: string;
  isOpen: boolean;
  toggle: () => void;
  linkTo: string;
};

import Modal from 'react-modal';
import { Link } from 'react-router-dom';

// TODO: Send answers to log server
export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ answer, isOpen, toggle, linkTo }) => {
  const [name, setName] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  Modal.setAppElement('#main');
  const modalStyle = {
    overlay: {
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
    content: {
      width: '480px',
      height: '400px',
      margin: 'auto',
      borderRadius: '1rem',
      padding: '1.5rem',
    },
  };

  return (
    <MDBContainer>
      <Modal isOpen={isOpen} style={modalStyle} onRequestClose={() => toggle()}>
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
        <MDBBtn color="secondary" className="float-left" onClick={toggle}>
          キャンセル
        </MDBBtn>
        <Link to={linkTo}>
          <MDBBtn
            disabled={name === '' || reason === ''}
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.className += ' was-validated';

              toggle();
            }}
          >
            検索タスクを終了する
          </MDBBtn>
        </Link>
      </Modal>
    </MDBContainer>
  );
};
