import React from 'react';
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';

import { SizedText } from '../../Components/AdjustedComponents';

type Props = {
  task: {
    id: number;
    slug: string;
    task: string;
    requiements: string[];
    placeholder: string;
  };
};

export const Introduction: React.FC<Props> = ({ task }) => {
  const history = useHistory();
  return (
    <MDBContainer className="my-5">
      <h1 className="mt-5">タスク内容</h1>
      <SizedText size="18px" className="font-weight-bold lead">
        {task.task}
      </SizedText>
      <h2 className="mt-5">注意事項</h2>
      <ul>
        <li>検索クエリは変更できません。</li>
        <li>
          表示された検索結果リスト及び、そのリンク先のページのみ閲覧してください。検索結果は新規タブで開かれます。
        </li>
        <li>
          検索タスクの終了時には
          {task.requiements.map((r) => {
            // eslint-disable-next-line react/jsx-key
            return <strong className="font-weight-bold">{`「${r}」`}</strong>;
          })}
          の{task.requiements.length}点を お尋ねしますので、ご準備をお願いします。
        </li>
        <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
      </ul>
      {/* TODO: 表示する条件をどこで判断するか，そもそも表示するか． */}
      <h2 className="mt-5">検索結果下部の表示について</h2>
      <p>
        次に表示される画面では、Google検索やYahoo検索エンジンのような検索結果ページを模したページが表示されます。
        各検索結果には、そのページを閲覧することで第三者に知られてしまう可能性のある閲覧履歴が表示されることがあります。
      </p>
      <MDBRow className="my-5">
        <MDBCol>
          <p className="font-weight-bold">第三者に知られてしまう可能性のある情報がない場合</p>
          <img src="./img/sample_result_unlinked.png" className="img-fluid z-depth-1" alt="" />
        </MDBCol>
        <MDBCol>
          <p className="font-weight-bold">第三者に知られてしまう可能性のある情報がある場合</p>
          <img src="./img/sample_result_linked.png" className="img-fluid z-depth-1" alt="" />
        </MDBCol>
      </MDBRow>
      <h3 className="mt-5">検出方法</h3>
      <p>
        ウェブページには「cookie」と呼ばれる、情報を一時的に保存しておくための仕組みが用意されており、ログイン情報の記録などに使用されることがあります。
        しかし、情報を保存したウェブページ以外のページが内容を読み込める「サードパーティcookie」も存在しています。
        主な使用例は広告です。サードパーティcookieに閲覧したページの情報などを保存しておき、広告を表示させる際にそのcookieを読み込むことで、
        過去に閲覧したページを元に、より関連の高い広告を表示する仕組みがあります。実験システムでは過去に訪れたウェブページから
        サードパーティcookieを検出することで、紐付けられる情報を判定しています。
      </p>
      <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
        <MDBBtn color="primary" className="float-right" onClick={() => history.push(`/task/${task.id}`)}>
          タスクを開始する
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};
