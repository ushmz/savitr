import { InputLabel, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Container from 'components/Container';
import Paragraph from 'components/Paragraph';
import { createTaskAnswer, makeSearchSesion } from 'shared/apis';
import { TaskInfo } from 'shared/types';
import { getConditionID, getSecondaryTaskID, getUID, getUserID } from 'shared/utils';

export const Introduction: React.FC<TaskInfo> = (props) => {
  const [clicked, isClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const navigate = useNavigate();

  const condition = getConditionID();
  const progresNumString = props.id <= 6 ? '1' : '2';
  const userId = getUserID();
  const uid = getUID();

  return (
    <Container>
      {/* タスク内容の段落 */}
      <h1>タスク内容{`（${progresNumString} / 2）`}</h1>
      <Paragraph>{props.description}</Paragraph>

      {/* 注意事項の段落 */}
      <h2>注意事項</h2>
      <Paragraph>
        <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
          <li>「検索結果リストを表示する」ボタンをクリックすると、新しいタブで検索結果リストが表示されます。</li>
          <li>
            今回のタスクでは検索キーワードは変更できません。表示された検索結果リストおよび、そのリンク先ページのみ閲覧してください。
          </li>
          <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
          <li>
            Google検索やYahoo検索など他のウェブ検索エンジンを使わずにタスクを行ってください。
            あくまで表示された検索結果リストとそのリンク先ページの情報のみをもとに、タスクを行ってください．
          </li>
        </ul>
      </Paragraph>

      {/* 留意事項の段落 */}
      <h2>留意事項</h2>
      <Paragraph>
        <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
          <li>タスク中はブラウザーの「戻る」ボタンは使用しないでください。</li>
          <li>
            タスク中、ページ閲覧ログを収集させていただきます。収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
          </li>
        </ul>
      </Paragraph>

      {/* 検索結果リストの説明の段落 */}
      <h2>検索結果リストについて</h2>
      <Paragraph>
        「検索結果リストを表示する」ボタンをクリックした後に表示される画面では、
        Google検索やYahoo検索のようなウェブ検索エンジンの結果ページを模したページが表示されます。
      </Paragraph>

      {/* 検索UIごとの説明 */}
      {taskDetail(condition)}

      {/* 検索結果ページへの遷移ボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <a target="_blank" rel="noopener noreferrer" href={`/search/${props.id}`}>
          <Button
            onClick={() => {
              isClicked(true);
              makeSearchSesion(userId, props.id, condition);
            }}
          >
            検索結果リストを表示する
          </Button>
        </a>
      </Box>

      {/* タスクの解答入力フォーム */}
      <h2>検索タスクの解答欄</h2>
      <form>
        <Box sx={{ mb: '12px' }}>
          <InputLabel htmlFor="answer">回答</InputLabel>
          <TextField id="answer" value={answer} fullWidth size="small" onChange={(e) => setAnswer(e.target.value)} />
        </Box>
        <Box sx={{ mb: '12px' }}>
          <InputLabel htmlFor="reason">理由</InputLabel>
          <TextField
            id="reason"
            value={reason}
            size="small"
            fullWidth
            multiline
            rows={4}
            onChange={(e) => setReason(e.target.value)}
          />
        </Box>
      </form>

      {/* タスクの解答提出ボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={!clicked}
          onClick={() => {
            if (answer === '') {
              toast.error('回答が入力されていません');
              return;
            }
            if (reason === '') {
              toast.error('回答の理由が入力されていません');
              return;
            }
            const taskId = getSecondaryTaskID();
            createTaskAnswer({
              user: userId,
              uid: uid,
              task: props.id,
              condition: condition,
              answer: answer,
              reason: reason,
            })
              .then(() => {
                makeSearchSesion(userId, props.id, condition);
                setAnswer('');
                setReason('');
                isClicked(false);
              })
              .then(() => toast.success('回答を記録しました'));
            if (taskId) {
              navigate(`/introduction/${taskId}`);
            } else {
              navigate('/posttask');
            }
          }}
        >
          回答を提出する
        </Button>
      </Box>
    </Container>
  );
};

const taskDetail = (condition: number) => {
  switch (condition) {
    case 5:
      return (
        <Box>
          <Paragraph>
            加えて、各検索結果には下図のように、
            「上のページを閲覧すると、以下のウェブサイトでも上記ページの閲覧履歴を記録・分析される可能性があります」
            というメッセージと共に「いくつかのウェブサイトのアイコン」が表示されることがあります。
            検索結果にウェブサイトのアイコンが表示されている場合、その検索結果からリンクされたページを閲覧すると、
            アイコンが示すウェブサイトでも検索結果のページを閲覧したことが記録・分析されてしまう
            可能性があることを意味します。
          </Paragraph>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={`public/img/samples/ja/${condition}.png`} alt="" width="560px" />
          </Box>
          <Paragraph>
            例えば上記の例では、「Webカメラのおすすめ11選！」というウェブページに対して、
            ブリジストンや日本野球機構を含む10のアイコンが表示されています。
            このことは、「Webカメラのおすすめ11選！」のウェブページを閲覧すると、
            「Webカメラのおすすめ11選！」のページだけでなく、
            「ブリジストン」や「日本野球機構」といったウェブサイトなどにウェブ広告を配信している企業などにも
            「Webカメラのおすすめ11選！」を閲覧したことが記録・分析されてしまう可能性があることが分かります。
          </Paragraph>
        </Box>
      );
    case 6:
      return (
        <Box>
          <Paragraph>
            加えて、各検索結果には下図のように、
            「上のページを閲覧すると、ページの閲覧履歴を記録・分析される可能性があります」と 表示されることがあります。
            検索結果にこのメッセージが表示されている場合、その検索結果からリンクされたページを閲覧すると、
            第三者にそのページの閲覧履歴が記録・分析されてしまう可能性があることを意味します。
          </Paragraph>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={`public/img/samples/ja/${condition}.png`} alt="" width="560px" />
          </Box>
          <Paragraph>
            例えば上記の例では、「Webカメラのおすすめ11選！」というウェブページに対して、
            「上のページを閲覧すると、ページの閲覧履歴を記録・分析される可能性があります」と表示されています。
            このことは、「Webカメラのおすすめ11選！」のウェブページを閲覧すると、
            そのページにウェブ広告を配信している企業などに「Webカメラのおすすめ11選！」を
            閲覧したことが記録・分析されてしまう可能性があることが分かります。
          </Paragraph>
        </Box>
      );
    case 7:
      return (
        <Box>
          <Paragraph>
            加えて、各検索結果には下図のように、 「検索結果からリンクされたページを閲覧したことが、
            どんなカテゴリのウェブサイトにどの程度知られてしまうかの割合情報」 が表示されることがあります。
            検索結果に割合情報が表示されている場合、その検索結果からリンクされたページを閲覧すると、
            割合が表示されたカテゴリのウェブサイトでも
            検索結果のページを閲覧したことが記録・分析されてしまう可能性があることを意味します。
          </Paragraph>
          <Box sx={{ mb: '24px', display: 'flex', justifyContent: 'center' }}>
            <img src={`public/img/samples/ja/${condition}.png`} alt="" width="560px" />
          </Box>
          <Paragraph>
            例えば上記の例では、「Webカメラのおすすめ11選！」というウェブページに対して、
            そのページを閲覧したことが知られてしまう3つのカテゴリのウェブサイトの数と割合が表示されています。
            上図からは、「Webカメラのおすすめ11選！」のウェブページを閲覧すると、
            「Webカメラのおすすめ11選！」のページだけでなく、
            「乗り物」や「ホームとガーデニング」のようなカテゴリのウェブサイトにウェブ広告を配信している企業などにも
            「Webカメラのおすすめ11選！」を閲覧したことが記録・分析されてしまう可能性があることを意味します。
          </Paragraph>
        </Box>
      );
    default:
      return;
  }
};
