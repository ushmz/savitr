import { MDBBtn } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Toppage } from 'Components/AdjustedComponents';
import { useAuth } from 'shared/provider/authProvider';

export const Top: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();
  const username = auth.user?.email?.split('@')[0] || '';
  return (
    <Toppage className="mx-auto my-5">
      <h1 className="my-4">ユーザ実験開始にあたって</h1>
      <p>
        本ウェブサイトは，{}にて掲載している情報検索タスクを行うためのサイトです．
        <br />
        本タスクは，静岡大学情報学部山本祐輔研究室で行っている情報検索に関するユーザ実験のために実施しています．
      </p>
      <p>
        タスクを開始するにあたって簡易的なユーザ登録をする必要があります．
        <br />
        登録時には，「ID（ユーザ名）」・「パスワード」が必要です．
      </p>
      <p>
        なお本タスクでは，タスク中のウェブ情報検索・閲覧行動を記録させていただきます．
        <br />
        記録したログ情報は匿名化されており，学術研究活動以外の目的で使用することはありません．
      </p>
      <p className="font-weight-bold">
        以上に同意していただける方のみ，下記ボタンをクリックしてユーザ登録を行い，タスクを開始してください．
      </p>
      <MDBBtn color="primary" onClick={() => history.push(`/user/${username || ''}`)}>
        はじめる
      </MDBBtn>
      {/* <img src="./img/Task-rafiki.svg" className="mx-auto d-block" width="300px" /> */}
    </Toppage>
  );
};
