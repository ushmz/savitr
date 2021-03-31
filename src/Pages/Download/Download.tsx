import { MDBBtn, MDBContainer, MDBRow } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const Download: React.FC = () => {
  const history = useHistory();
  return (
    <MDBContainer>
      <MDBRow>
        <h1>chrome用閲覧履歴エクスポート拡張</h1>
        <p>閲覧履歴をエクスポートするchrome拡張です。下記の注意事項を確認し，同意できる方のみご使用ください。</p>
        <ul>
          <li>本chrome拡張はあなたのブラウザ閲覧履歴にアクセスします。</li>
          <li>本chrome拡張はあなたのブラウザ閲覧履歴にアクセスします。</li>
          <li>本chrome拡張はあなたのブラウザ閲覧履歴にアクセスします。</li>
          <li>本chrome拡張はあなたのブラウザ閲覧履歴にアクセスします。</li>
        </ul>
      </MDBRow>
      <MDBRow>
        <a href="http://localhost:8080/v1/download/crx">
          <MDBBtn onClick={() => {}} />
        </a>
      </MDBRow>
      <MDBRow></MDBRow>
    </MDBContainer>
  );
};
