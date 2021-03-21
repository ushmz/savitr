import {MDBContainer, MDBRow} from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const Download: React.FC = () => {
  const history = useHistory();
  return (
    <MDBContainer>
      <MDBRow>
        <h1>chrome用閲覧履歴エクスポート拡張</h1>
	<p>閲覧履歴をエクスポートするchrome拡張です。</p>
	<p>下記の注意事項を確認し，同意できる方のみご使用ください。</p>
	<ul>
	  <li>本chrome拡張はあなたのブラウザ閲覧履歴にアクセスします。</li>
	  <li></li>
	  <li></li>
	  <li></li>
	</ul>
      </MDBRow>
      <MDBRow></MDBRow>
      <MDBRow></MDBRow>
    </MDBContainer>);
}

