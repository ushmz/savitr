import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from 'shared/provider/authProvider';
import { createUser } from 'shared/apis';
import { CROWDSOURCING_SITE } from 'shared/config';
import Button from 'Components/SimpleButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

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
    <Box
      sx={{
        maxWidth: '960px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '10px',
      }}
    >
      <h1 className="my-4">検索タスク開始にあたって</h1>
      <p>本ウェブサイトは、{CROWDSOURCING_SITE}にて掲載している検索タスクを行っていただくためのサイトです。</p>

      <p>
        本タスクでははじめにアンケートに回答していただきます。続いて検索タスクを行っていただきます。
        最後にもう一度アンケートに回答していただきます。タスク全体の想定時間は 20 分程度を想定しております。
      </p>

      <p>
        タスク中、ページ閲覧ログを収集させていただきます。
        収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
      </p>

      <p className="font-weight-bold">
        以上に同意していただける方は、以下の入力欄に「{CROWDSOURCING_SITE}ID」を入力し、
        「タスクを開始する」ボタンをクリックしてタスクを開始してください。
      </p>

      <form className="my-5" onSubmit={onSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { width: '25ch' },
          }}
        >
          <InputLabel htmlFor="externalId">{CROWDSOURCING_SITE}IDは半角英数字と記号を用いて入力してください</InputLabel>
          <TextField
            id="externalId"
            label={`${CROWDSOURCING_SITE}IDを入力`}
            margin="dense"
            pattern="[0-9a-zA-Z-_]*([ \.][0-9a-zA-Z-_]+)*"
            {...register('externalId')}
          />
          {errors.externalId && <p style={{ color: 'red' }}>{errors.externalId.message}</p>}
          <Box style={{ marginTop: '10px' }}>
            <Button
              style={{ height: '48px', width: '170px' }}
              type="submit"
              onClick={() => {
                setError('externalId', { type: 'manual', message: '必須項目です' });
              }}
            >
              {isLoading ? (
                <CircularProgress
                  size={48}
                  sx={{
                    color: 'snow',
                    top: '50%',
                    left: '50%',
                  }}
                  color="info"
                />
              ) : (
                'タスクを開始する'
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
