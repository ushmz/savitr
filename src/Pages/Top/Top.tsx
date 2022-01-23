import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'Components/Button';
import Container from 'Components/Container';
import { ComponentLoadingCenter } from 'Components/Loader';
import { createUser } from 'shared/apis';
import { CROWDSOURCING_SITE } from 'shared/config';
import { useAuth } from 'shared/provider/authProvider';

type RegisterParam = {
  externalId: string;
  passwd: string;
};

export const Top: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterParam>();

  const onSubmit = handleSubmit(({ externalId }) => {
    const ext = externalId.replace(' ', '');
    if (ext === '') {
      toast.error(`${CROWDSOURCING_SITE}IDが入力されていません`);
      return;
    }
    setLoading(true);
    createUser(ext)
      .then((v) => {
        const email = ext + '@savitr.dummy.com';
        if (v.exist) {
          auth
            .signIn(email, v.secret)
            .then(() => {
              localStorage.setItem('uid', ext);
              localStorage.setItem('user', '' + v.user);
              localStorage.setItem('standby', '' + v.tasks[0]);
              localStorage.setItem('notyet', '' + v.tasks[1]);
              localStorage.setItem('condition', '' + v.condition);
              localStorage.setItem('group', '' + v.group);
              setLoading(false);
              history.push('/pretask');
            })
            .catch(() => {
              toast.error(`予期せぬエラーが発生しました`);
              setLoading(false);
            });
        } else {
          auth
            .signUp(email, v.secret)
            .then(() => {
              localStorage.setItem('uid', ext);
              localStorage.setItem('user', '' + v.user);
              localStorage.setItem('standby', '' + v.tasks[0]);
              localStorage.setItem('notyet', '' + v.tasks[1]);
              localStorage.setItem('condition', '' + v.condition);
              localStorage.setItem('group', '' + v.group);
              setLoading(false);
              history.push('/pretask');
            })
            .catch(() => {
              toast.error(`予期せぬエラーが発生しました`);
              setLoading(false);
            });
        }
      })
      .catch((res) => {
        toast.error(`予期せぬエラーが発生しました : ${res}`);
        setLoading(false);
      });
  });

  return (
    <Container>
      <h1>検索タスク開始にあたって</h1>
      <Typography paragraph>
        本ウェブサイトは、{CROWDSOURCING_SITE}にて掲載している検索タスクを行っていただくためのサイトです。
      </Typography>

      <Typography paragraph>
        本タスクでははじめにアンケートに回答していただきます。続いて検索タスクを行っていただきます。
        最後にもう一度アンケートに回答していただきます。タスク全体の想定時間は 20 分程度を想定しております。
      </Typography>

      <Typography paragraph>
        タスク中、ページ閲覧ログを収集させていただきます。
        収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
      </Typography>

      <Typography paragraph>
        以上に同意していただける方は、以下の入力欄に「{CROWDSOURCING_SITE}ID」を入力し、
        「タスクを開始する」ボタンをクリックしてタスクを開始してください。
      </Typography>

      <form onSubmit={onSubmit}>
        <InputLabel htmlFor="externalId">
          {CROWDSOURCING_SITE}を入力（IDは半角英数字と記号を用いて入力してください）
        </InputLabel>
        <TextField
          id="externalId"
          size="small"
          pattern="[0-9a-zA-Z-_]*([ \.][0-9a-zA-Z-_]+)*"
          {...register('externalId')}
          sx={{ width: '360px' }}
        />
        {errors.externalId && <p style={{ color: 'red' }}>{errors.externalId.message}</p>}
        <Box sx={{ mt: '20px' }}>
          <Button
            type="submit"
            // To avoid changing button size by inner elements(text or progress),
            // fix button size here.
            style={{ height: '48px', width: '160px' }}
            onClick={() => {
              setError('externalId', { type: 'manual', message: '必須項目です' });
            }}
          >
            {isLoading ? <ComponentLoadingCenter /> : 'タスクを開始する'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};
