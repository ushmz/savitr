import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import { toast } from 'react-toastify';
import { SizedText } from '../../Components/AdjustedComponents';
import history from '../../shared/browserHistory';
import { createTaskAnswer, TaskInfo } from '../../shared/apis/apis';
import { CONDITION_EXP } from '../../shared/consts';
import { useAuth } from '../../shared/provider/authProvider';
import { getConditionId, getUserId } from '../../shared/util';

export const Introduction: React.FC<TaskInfo> = (props) => {
  const [clicked, isClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const condition = localStorage.getItem('condition') || '';
  const isUIDetailVisible = condition === CONDITION_EXP;

  const progresNumString = props.id <= 6 ? '1' : '2';
  const userId = getUserId();
  const conditionId = getConditionId();
  const auth = useAuth();
  const uid = auth.user?.email?.split('@')[0] || '';

  return (
    <>
      <link type="text/css" rel="stylesheet" href="css/link_nocolor.css" />
      <MDBContainer className="my-5">
        <h1 className="mt-5">タスク内容{`（${progresNumString} / 2）`}</h1>
        <SizedText size="18px" className="lead">
          {props.description}
        </SizedText>
        <h2 className="mt-5">注意事項</h2>
        <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
          <li>「検索結果リストを表示する」ボタンをクリックすると、新しいタブで検索結果リストが表示されます。</li>
          <li>
            検索キーワードは変更できません。表示された検索結果リスト及び、そのリンク先のページのみ閲覧してください。
          </li>
          <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
          <li>Google検索やYahoo検索を使わずにタスクを行ってください。</li>
          <li>
            検索が終わったら、タスクの回答と理由をこの画面の下側の入力欄に入力し、「回答を提出する」ボタンを押して提出してください。
          </li>
        </ul>

        <h2 className="mt-5">留意事項</h2>
        <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
          <li>タスク中はブラウザーの「戻る」ボタンは使用しないでください。</li>
          <li>
            タスク中、ページ閲覧ログを収集させていただきます。収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
          </li>
        </ul>
        {isUIDetailVisible && (
          <>
            <MDBRow className="my-5">
              <h2 className="mt-5">検索結果リストについて</h2>
              <p>
                次に表示される画面では、Google検索やYahoo検索のような検索エンジンの結果ページを模したページが表示されます。
                各検索結果には、そのページを閲覧することで第三者に知られてしまう可能性のあるウェブページが表示されることがあります。
              </p>
              <MDBCol>
                <p>第三者に知られてしまう可能性のある情報がない場合</p>
                <img src="public/img/samples/sample_result_unlinked.png" className="img-fluid z-depth-1" alt="" />
              </MDBCol>
              <MDBCol>
                <p>第三者に知られてしまう可能性のある情報がある場合</p>
                <img src="public/img/samples/sample_result_linked.png" className="img-fluid z-depth-1" alt="" />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <p>
                上記の例では「《2021年》おすすめヘッドホン15選！高音質が魅力の注目」というウェブページにアクセスをすることで
                「第3者に過去に訪問したことが知られてしまう可能性があるページ 」の欄に表示されている 9
                つのウェブサイトにアクセスしていたことが第三者に知られてしまうことを意味しています．
              </p>
            </MDBRow>
          </>
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
                  condition: conditionId,
                  answer: answer,
                  reason: reason,
                }).then(() => toast.success('回答を記録しました'));
                setAnswer('');
                setReason('');
                history.push(`/introduction/${taskId}`);
              } else {
                createTaskAnswer({
                  user: userId,
                  uid: uid,
                  task: props.id,
                  condition: conditionId,
                  answer: answer,
                  reason: reason,
                }).then(() => toast.success('回答を記録しました'));
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
