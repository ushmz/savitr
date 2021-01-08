import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { MDBBtn, MDBContainer, MDBTypography } from 'mdbreact';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <MDBContainer className="m-3">
      <MDBTypography tag="p">
        実験へのご協力ありがとうございます。以下のボタンから実験を開始してください。
      </MDBTypography>
      <MDBBtn
        style={{ width: '240px' }}
        color="primary"
        onClick={() => {
          chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/option.html` });
        }}
      >
        実験開始
      </MDBBtn>
    </MDBContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
