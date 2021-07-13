import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import { SizedText } from '../../Components/AdjustedComponents';
import history from '../../shared/browserHistory';
import { createTaskAnswer, TaskInfo } from '../../shared/apis/apis';
import { CONDITION_EXP } from '../../shared/consts';
import { useAuth } from 'shared/provider/authProvider';
import { getUserId } from 'shared/util';

export const Introduction: React.FC<TaskInfo> = (props) => {
  const [answer, setAnswer] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const condition = localStorage.getItem('condition') || '';
  const isUIDetailVisible = condition === CONDITION_EXP;

  const userId = getUserId();
  const auth = useAuth();
  const uid = auth.user?.email?.split('@')[0] || '';

  return (
    <>
      <link type="text/css" rel="stylesheet" href="css/link_nocolor.css" />
      <MDBContainer className="my-5">
        <h1 className="mt-5">タスク内容</h1>
        <SizedText size="18px" className="lead">
          {props.description}
        </SizedText>
        <h2 className="mt-5">注意事項</h2>
        <ul>
          <li>・「検索結果リストを表示する」ボタンをクリックすると、新しいタブで検索結果リストが表示されます。</li>
          <li>・表示された検索結果リスト及び、そのリンク先のページのみ閲覧してください。</li>
          <li>・検索キーワードは変更できません。</li>
          <li>・制限時間はありませんので、納得のいくまで検索を行ってください。</li>
          <li>・Google検索やYahoo検索を使わずにタスクを行ってください。</li>
          <li>
            ・検索が終わったら、タスクの回答と理由をこの画面の下側の入力欄に入力し、「回答を提出する」ボタンを押して提出してください。
          </li>
        </ul>

        <h2 className="mt-5">留意事項</h2>
        <p>・タスク中はブラウザーの「戻る」ボタンは使用しないでください。</p>
        <p>・タスク中、ページ閲覧ログを収集させていただきます。</p>
        <p>・収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。</p>
        {isUIDetailVisible && (
          <MDBRow className="my-5">
            <h2 className="mt-5">検索結果リストについて</h2>
            <p>
              次に表示される画面では、Google検索やYahoo検索のような検索エンジンの結果ページを模したページが表示されます。
              各検索結果には、そのページを閲覧することで第三者に知られてしまう可能性のあるウェブページが表示されることがあります。
            </p>
            <MDBCol>
              <p>第三者に知られてしまう可能性のある情報がない場合</p>
              <img src="/img/samples/sample_result_unlinked.png" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
            <MDBCol>
              <p>第三者に知られてしまう可能性のある情報がある場合</p>
              <img src="/img/samples/sample_result_linked.png" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
          </MDBRow>
        )}

        <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
          <a target="_blank" rel="noopener noreferrer" style={{ color: 'white' }} href={`/search/${props.id}`}>
            <MDBBtn color="primary" className="float-right" style={{ width: '240px' }}>
              検索結果リストを表示する
            </MDBBtn>
          </a>
        </div>
        <h2 className="mt-5">回答</h2>
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
            color="primary"
            style={{ width: '240px' }}
            onClick={() => {
              const taskId = localStorage.getItem('notyet');
              if (taskId) {
                localStorage.removeItem('notyet');
                createTaskAnswer({
                  user: userId,
                  uid: uid,
                  taskId: props.id,
                  conditionId: props.conditionId,
                  answer: answer,
                  reason: reason,
                });
                setAnswer('');
                setReason('');
                history.push(`/introduction/${taskId}`);
              } else {
                createTaskAnswer({
                  user: userId,
                  uid: uid,
                  taskId: props.id,
                  conditionId: props.conditionId,
                  answer: answer,
                  reason: reason,
                });
                setAnswer('');
                setReason('');
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
