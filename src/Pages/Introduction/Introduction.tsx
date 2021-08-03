import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import { toast } from 'react-toastify';
import { SizedText } from '../../Components/AdjustedComponents';
import history from '../../shared/browserHistory';
import { createTaskAnswer, TaskInfo } from '../../shared/apis/apis';
import { CONDITION_ICON, CONDITION_DIST } from '../../shared/consts';
import { getConditionId, getUID, getUserId } from '../../shared/util';

export const Introduction: React.FC<TaskInfo> = (props) => {
  const [clicked, isClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const condition = getConditionId();
  const isUIDetailVisible = condition === CONDITION_ICON || condition === CONDITION_DIST;
  const progresNumString = props.id <= 6 ? '1' : '2';
  const userId = getUserId();
  const uid = getUID();

  return (
    <>
      <MDBContainer className="my-5">
        <h1 className="mt-5">タスク内容{`（${progresNumString} / 2）`}</h1>
        <SizedText size="18px" className="lead">
          {props.description}
        </SizedText>
        <h2 className="mt-5">注意事項</h2>
        <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
          <li>「検索結果リストを表示する」ボタンをクリックすると、新しいタブで検索結果リストが表示されます。</li>
          <li>
            今回のタスクでは検索キーワードは変更できません。表示された検索結果リストおよび、そのリンク先ページのみ閲覧してください。
          </li>
          <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
          <li>
            Google検索やYahoo検索など他のウェブ検索エンジンを使わずにタスクを行ってください。あくまで表示された検索結果リストとそのリンク先ページの情報のみをもとに，タスクを行ってください．
          </li>
        </ul>

        <h2 className="mt-5">留意事項</h2>
        <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
          <li>タスク中はブラウザーの「戻る」ボタンは使用しないでください。</li>
          <li>
            タスク中、ページ閲覧ログを収集させていただきます。収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
          </li>
        </ul>
        <h2 className="mt-5">検索結果リストについて</h2>
        <p>
          「検索結果リストを表示する」ボタンをクリックした後に表示される画面では、Google検索やYahoo検索のようなウェブ検索エンジンの結果ページを模したページが表示されます。
        </p>

        {isUIDetailVisible && (
          <MDBCol>
            <MDBRow>
              {condition === 5 ? (
                <p>
                  　加えて、各検索結果には「いくつかのウェブサイトのアイコン」が表示されることがあります。
                  ウェブサイトの中にはユーザの閲覧行動をウェブ広告会社に送信するトラッカー機能が埋め込まれている場合があります。検索結果にウェブサイトのアイコンが表示されている場合、
                  その検索結果を閲覧するとアイコンが示すウェブサイトのトラッカー（広告会社）に
                  検索結果を閲覧したことが知られてしまう可能性があることを意味します。
                </p>
              ) : (
                <p>
                  　加えて、各検索結果には「そのページに訪問したことがどんなカテゴリのウェブサイトにどの程度知られてしまうかの情報」が表示されることがあります。
                  ウェブサイトの中にはユーザの閲覧行動をウェブ広告会社に送信するトラッカー機能が埋め込まれている場合があります。
                  検索結果に「そのページに訪問したことがどんなカテゴリのウェブサイトにどの程度知られてしまうかの割合」が表示されている場合、その検索結果を閲覧すると割合が表示されたカテゴリのウェブサイトのトラッカー（広告会社）に検索結果を閲覧したことが知られてしまう可能性があることを意味します。
                </p>
              )}
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
              <img src={`public/img/samples/${condition}.png`} className="img-fluid z-depth-1" alt="" width="560px" />
            </MDBRow>
            <MDBRow className="my-3">
              {condition === 5 ? (
                <p>
                  例えば上記の例では、「Webカメラのおすすめ11選！」というウェブページに対して、
                  ブリジストンや日本野球機構を含む10のアイコンが表示されています。
                  このことは、「Webカメラのおすすめ11選！」のウェブサイトを閲覧すると、
                  <ul style={{ margin: '20px', listStyleType: 'disc' }}>
                    <li>
                      ブリジストンや日本野球機構などにウェブ広告を配信している企業に
                      「Webカメラのおすすめ11選！」を閲覧したことが知られてしまい、
                    </li>
                    <li>
                      次回ブリジストンや日本野球機構などのウェブサイトを訪問した際に、
                      「Webカメラのおすすめ11選！」を閲覧したという記録を使ってウェブ広告が表示される
                    </li>
                  </ul>
                  可能性があることを意味します。
                </p>
              ) : (
                <p>
                  例えば上記の例では、「Webカメラのおすすめ11選！」というウェブページに対して、
                  そのページに訪問したことが知られてしまう3つのカテゴリのウェブサイトの 数と割合が表示されています。
                  上記の図からは、「Webカメラのおすすめ11選！」のウェブサイトを閲覧すると、
                  <ul style={{ margin: '20px', listStyleType: 'disc' }}>
                    <li>
                      「乗り物」や「ホームとガーデニング」といったカテゴリのウェブサイトに
                      広告を配信している企業に「Webカメラのおすすめ11選！」を閲覧したことが知られてしまい、
                    </li>
                    <li>
                      次回「乗り物」や「ホームとガーデニング」のようなカテゴリの
                      ウェブサイトを訪問した際に、「Webカメラのおすすめ11選！」を閲覧したという
                      記録を使ってウェブ広告が表示される
                    </li>
                  </ul>
                  可能性があることが分かります。
                </p>
              )}
            </MDBRow>
          </MDBCol>
        )}

        <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
          <a target="_blank" rel="noopener noreferrer" style={{ color: 'white' }} href={`/search/${props.id}`}>
            <MDBBtn color="primary" className="float-right" style={{ width: '240px' }} onClick={() => isClicked(true)}>
              検索結果リストを表示する
            </MDBBtn>
          </a>
        </div>
        <h2 className="mt-5">検索タスクの解答欄</h2>
        <form className="mx-5 my-5">
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="productName">
              回答
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              className="form-control"
              onChange={(e) => setAnswer(e.target.value)}
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
        <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
          <MDBBtn
            className={clicked ? '' : 'disabled'}
            color="primary"
            style={{ width: '240px' }}
            onClick={() => {
              if (answer === '') {
                toast.error('回答が入力されていません');
                return;
              }
              if (reason === '') {
                toast.error('回答の理由が入力されていません');
                return;
              }
              const taskId = localStorage.getItem('notyet');
              if (taskId) {
                localStorage.removeItem('notyet');
                createTaskAnswer({
                  user: userId,
                  uid: uid,
                  task: props.id,
                  condition: condition,
                  answer: answer,
                  reason: reason,
                }).then(() => toast.success('回答を記録しました'));
                setAnswer('');
                setReason('');
                isClicked(false);
                history.push(`/introduction/${taskId}`);
              } else {
                createTaskAnswer({
                  user: userId,
                  uid: uid,
                  task: props.id,
                  condition: condition,
                  answer: answer,
                  reason: reason,
                }).then(() => toast.success('回答を記録しました'));
                setAnswer('');
                setReason('');
                isClicked(false);
                history.push('/posttask');
              }
            }}
          >
            回答を提出する
          </MDBBtn>
        </div>
      </MDBContainer>
    </>
  );
};
