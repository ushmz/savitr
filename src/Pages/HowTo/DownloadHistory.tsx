import { MDBBtn, MDBContainer } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'Components/Header';

export const DownloadHistory: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <MDBContainer className="mt-5">
        <h1>履歴情報のエクスポート方法について</h1>
        <p>
          このページでは、ご自身の google アカウントから、閲覧履歴の情報をエクスポートする方法について解説します。
          Google アカウントをお持ちの場合、以下の手順で閲覧履歴データをエクスポートすることが可能です。
        </p>
        <ol>
          <li>
            <a href="https://takeout.google.com/">自分のデータをダウンロード</a>
            するページに移動します。（別タブで Google のページが開かれます。）
          </li>
          <li>Google アカウントでログインしていない場合はログインを行ってください。</li>
          <li>「選択をすべて解除」をクリックします。</li>
          <img src="/public/img/how2/downloadHistory/0001.png" width="100%" />
          <li>「Chrome のブックマーク、履歴などの設定」の欄にチェックを入れます。</li>
          <img src="/public/img/how2/downloadHistory/0002.png" width="100%" />
          <li>「Chrome のすべてのデータが含まれます」をクリックします。</li>
          <img src="/public/img/how2/downloadHistory/0003.png" width="100%" />
          <li>「選択をすべて解除」をクリックします。</li>
          <img src="/public/img/how2/downloadHistory/0004.png" width="100%" />
          <li>「BrowserHistory」のみを選択します。</li>
          <img src="/public/img/how2/downloadHistory/0005.png" width="100%" />
          <li>1 番下までスクロールし、「次のステップ」をクリックします。</li>
          <img src="/public/img/how2/downloadHistory/0006.png" width="100%" />

          <li>
            「1
            回エクスポート」が選択されていることを確認し、「エクスポートを作成」をクリックします。その他の項目はそのままで構いません。
          </li>
          <img src="/public/img/how2/downloadHistory/0007.png" width="100%" />
          <li>
            エクスポートが完了すると画面が切り替わります。「ダウンロード」をクリックして履歴情報をダウンロードしてください。
          </li>
          <img src="/public/img/how2/downloadHistory/0008.png" width="100%" />
        </ol>
        <MDBBtn color="primary" onClick={() => history.goBack()}>
          戻る
        </MDBBtn>
      </MDBContainer>
    </>
  );
};
