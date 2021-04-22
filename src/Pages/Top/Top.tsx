import { MDBBtn } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Toppage } from 'Components/AdjustedComponents';

export const Top: React.FC = () => {
  const history = useHistory();
  return (
    <Toppage className="mx-auto my-5">
      <h1 className="my-4">履歴情報の提供にあたって</h1>
      <p>
        本ウェブサイトは，ランサーズにて掲載している履歴情報を提供していただくためのサイトです．
        <br />
        本タスクは，静岡大学情報学部山本祐輔研究室で行っているユーザ実験のために実施しています．
      </p>
      <p>
        タスクを開始するにあたって簡易的なユーザ登録をする必要があります．
        <br />
        登録時には，「ランサーズID」が必要です．
      </p>
      {/* <p>
		  なお本タスクでは，タスク中のウェブ情報検索・閲覧行動を記録させていただきます．
		  <br />
		  記録したログ情報は匿名化されており，学術研究活動以外の目的で使用することはありません．
		  </p>
	  */}
      <p className="font-weight-bold">
        以上に同意していただける方のみ，下記ボタンをクリックしてユーザ登録を行い，タスクを開始してください．
      </p>
      <MDBBtn color="primary" onClick={() => history.push('/register')}>
        はじめる
      </MDBBtn>
      {/* <img src="./img/Task-rafiki.svg" className="mx-auto d-block" width="300px" /> */}
    </Toppage>
  );
};
