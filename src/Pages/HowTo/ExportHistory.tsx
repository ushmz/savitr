import { MDBBtn, MDBContainer } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../Components/Header';

export const ExportHistory: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <MDBContainer className="mt-5">
        <h1>chrome 拡張機能を使用した履歴情報のエクスポート方法について</h1>
        <p>このページでは、chrome 拡張機能を用いた閲覧履歴のエクスポート方法について解説します。</p>
        <ol className="my-5">
          <li className="my-3">
            閲覧履歴をエクスポートできる拡張機能をダウンロードします。以下のリンク先にアクセスしてください。
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://chrome.google.com/webstore/detail/history-export/lpmoaclacdaofhlijejogfldmgkdlglj/related?hl=ja"
                >
                  History export by Quamilek
                </a>
              </li>
            </ul>
          </li>
          <li className="my-3">画像のようなページが表示されたら、「chromeに追加」をクリックします。</li>
          <img src="/public/img/how2/exportHistory/01.png" width="100%" className="my-3 mx-3" />

          <li className="my-3">ポップアップの内容を確認し、「拡張機能を追加」をクリックします。</li>
          <div className="mx-auto">
            <img src="/public/img/how2/exportHistory/02.png" width="50%" className="my-3 mx-3" />
          </div>

          <li className="my-3">
            「拡張機能が追加されました」と書かれたポップアップが表示されたら、アイコンをクリックします。
          </li>
          <img src="/public/img/how2/exportHistory/03.png" width="50%" className="my-3 mx-3" />

          <li className="my-3">「all history」をクリックします。</li>
          <img src="/public/img/how2/exportHistory/04.png" width="50%" className="my-3 mx-3" />

          <li className="my-3">
            閲覧履歴情報が「history.json」というファイル名で保存されます。ファイル名は変更しないでください。
          </li>
          <img src="/public/img/how2/exportHistory/05.png" width="50%" className="my-3 mx-3" />

          <li className="my-3">
            ダウンロードが完了したら、先程保存した「history.json」というファイルを
            アップロード画面にドラッグアンドドロップしてください。
          </li>
          <img src="/public/img/how2/exportHistory/06.png" width="100%" className="my-3 mx-3" />

          <li className="my-3">「アップロードする」のボタンを押してアップロードを完了します。</li>
          <img src="/public/img/how2/exportHistory/07.png" width="100%" className="my-3 mx-3" />

          <li className="my-3">完了コードが表示されればタスクは完了です。</li>
          <img src="/public/img/how2/exportHistory/08.png" width="100%" className="my-3 mx-3" />

          <li className="my-3">完了コードを記録したら、「ログアウト」ボタンよりタスクを終了してください。</li>
        </ol>
        <MDBBtn color="primary" onClick={() => history.goBack()}>
          戻る
        </MDBBtn>
      </MDBContainer>
    </>
  );
};
