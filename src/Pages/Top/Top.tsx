import { MDBBtn } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Toppage } from 'Components/AdjustedComponents';

export const Top: React.FC = () => {
  const history = useHistory();
  return (
    <Toppage className="mx-auto my-5">
      <h1 className="my-4">履歴情報の提供にあたって</h1>
      <p>本ウェブサイトは、ランサーズにて掲載している履歴情報を提供していただくためのサイトです。</p>
      <p>本タスクで提供していただく情報は以下の通りです。</p>
      <ul>
        <li>・ランサーズID（タスク管理用）</li>
        <li>・過去に閲覧したウェブページのURL</li>
      </ul>
      <p>
        Gmailなど、ウェブページよってはページのタイトルやURLに個人情報が含まれている
        場合がございますが、本タスクではURLのみを収集対象とし、個人が特定できてしまうような情報は
        保存いたしません。また、タスク依頼者からどのランサーがどのURLを閲覧していたかが
        分からないよう、提出していただいた情報を匿名化します。 ​
        提供いただいた閲覧履歴は、静岡大学情報学部で行っている研究目的で使用いたします。
        研究目的にのみ使用し、その他の目的では一切使用いたしません。 ​
      </p>
      {/* <p>
		  なお本タスクでは，タスク中のウェブ情報検索・閲覧行動を記録させていただきます．
		  <br />
		  記録したログ情報は匿名化されており，学術研究活動以外の目的で使用することはありません．
		  </p>
	  */}
      <p className="font-weight-bold">
        以上に同意していただける方は、下記ボタンをクリックして「ランサーズID」を入力し、タスクを開始してください．
      </p>
      <MDBBtn color="primary" onClick={() => history.push('/register')}>
        はじめる
      </MDBBtn>
      {/* <img src="./img/Task-rafiki.svg" className="mx-auto d-block" width="300px" /> */}
    </Toppage>
  );
};
