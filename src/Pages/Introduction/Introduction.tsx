import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import { toast } from 'react-toastify';
import { SizedText } from 'Components/AdjustedComponents';
import history from 'shared/utils/browserHistory';
import { createTaskAnswer, makeSearchSesion } from 'shared/apis';
import { TaskInfo } from 'shared/types';
import { getConditionId, getUID, getUserId } from 'shared/utils';

export const Introduction: React.FC<TaskInfo> = (props) => {
  const [clicked, isClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const condition = getConditionId();
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
            Google検索やYahoo検索など他のウェブ検索エンジンを使わずにタスクを行ってください。あくまで表示された検索結果リストとそのリンク先ページの情報のみをもとに、タスクを行ってください．
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
        {taskDetail(condition)}
        <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
          <a target="_blank" rel="noopener noreferrer" style={{ color: 'white' }} href={`/search/${props.id}`}>
            <MDBBtn
              color="primary"
              className="float-right"
              style={{ width: '240px' }}
              onClick={() => {
                isClicked(true);
                makeSearchSesion(userId, props.id, condition);
              }}
            >
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
                makeSearchSesion(userId, props.id, condition);
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
                makeSearchSesion(userId, props.id, condition);
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

const taskDetail = (condition: number) => {
  switch (condition) {
    case 5:
      return (
        <MDBCol>
          <MDBRow>
            <p>
              加えて、各検索結果には下図のように、
              「上のページを閲覧すると、以下のウェブサイトでも上記ページの閲覧履歴を記録・分析される可能性があります」
              というメッセージと共に「いくつかのウェブサイトのアイコン」が表示されることがあります。
              検索結果にウェブサイトのアイコンが表示されている場合、その検索結果からリンクされたページを閲覧すると、
              アイコンが示すウェブサイトでも検索結果のページを閲覧したことが記録・分析されてしまう
              可能性があることを意味します。
            </p>
          </MDBRow>
          <MDBRow className="d-flex justify-content-center">
            <img src={`public/img/samples/ja/${condition}.png`} className="img-fluid z-depth-1" alt="" width="560px" />
          </MDBRow>
          <MDBRow className="my-3">
            <p>
              例えば上記の例では、「Webカメラのおすすめ11選！」というウェブページに対して、
              ブリジストンや日本野球機構を含む10のアイコンが表示されています。
              このことは、「Webカメラのおすすめ11選！」のウェブページを閲覧すると、
              「Webカメラのおすすめ11選！」のページだけでなく、
              「ブリジストン」や「日本野球機構」といったウェブサイトなどにウェブ広告を配信している企業などにも
              「Webカメラのおすすめ11選！」を閲覧したことが記録・分析されてしまう可能性があることが分かります。
            </p>
          </MDBRow>
        </MDBCol>
      );
    case 6:
      return (
        <MDBCol>
          <MDBRow>
            <p>
              加えて、各検索結果には下図のように、
              「上のページを閲覧すると、ページの閲覧履歴を記録・分析される可能性があります」と
              表示されることがあります。
              検索結果にこのメッセージが表示されている場合、その検索結果からリンクされたページを閲覧すると、
              第三者にそのページの閲覧履歴が記録・分析されてしまう可能性があることを意味します。
            </p>
          </MDBRow>

          <MDBRow className="d-flex justify-content-center">
            <img src={`public/img/samples/ja/${condition}.png`} className="img-fluid z-depth-1" alt="" width="560px" />
          </MDBRow>
          <MDBRow className="my-3">
            <p>
              例えば上記の例では、「Webカメラのおすすめ11選！」というウェブページに対して、
              「上のページを閲覧すると、ページの閲覧履歴を記録・分析される可能性があります」と表示されています。
              このことは、「Webカメラのおすすめ11選！」のウェブページを閲覧すると、
              そのページにウェブ広告を配信している企業などに「Webカメラのおすすめ11選！」を
              閲覧したことが記録・分析されてしまう可能性があることが分かります。
            </p>
          </MDBRow>
        </MDBCol>
      );
    case 7:
      return (
        <MDBCol>
          <MDBRow>
            <p>
              加えて、各検索結果には下図のように、 「検索結果からリンクされたページを閲覧したことが、
              どんなカテゴリのウェブサイトにどの程度知られてしまうかの割合情報」 が表示されることがあります。
              検索結果に割合情報が表示されている場合、その検索結果からリンクされたページを閲覧すると、
              割合が表示されたカテゴリのウェブサイトでも
              検索結果のページを閲覧したことが記録・分析されてしまう可能性があることを意味します。
            </p>
          </MDBRow>
          <MDBRow className="d-flex justify-content-center">
            <img src={`public/img/samples/ja/${condition}.png`} className="img-fluid z-depth-1" alt="" width="560px" />
          </MDBRow>
          <MDBRow className="my-3">
            <p>
              例えば上記の例では、「Webカメラのおすすめ11選！」というウェブページに対して、
              そのページを閲覧したことが知られてしまう3つのカテゴリのウェブサイトの数と割合が表示されています。
              上図からは、「Webカメラのおすすめ11選！」のウェブページを閲覧すると、
              「Webカメラのおすすめ11選！」のページだけでなく、
              「乗り物」や「ホームとガーデニング」のようなカテゴリのウェブサイトにウェブ広告を配信している企業などにも
              「Webカメラのおすすめ11選！」を閲覧したことが記録・分析されてしまう可能性があることを意味します。
            </p>
          </MDBRow>
        </MDBCol>
      );
    default:
      return;
  }
};
