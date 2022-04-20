import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Container from 'components/Container';
import { ComponentLoadingCenter } from 'components/Loader';
import { CROWDSOURCING_SITE } from 'shared/config';

type RegisterParam = {
  externalID: string;
  passwd: string;
};

type Props = {
  registerUser: (externalID: string) => Promise<boolean>;
};

export const Top: React.FC<Props> = ({ registerUser }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterParam>();

  const onSubmit = handleSubmit(({ externalID }) => {
    const ext = externalID.replace(' ', '');
    if (ext === '') {
      toast.error(`${CROWDSOURCING_SITE}ユーザ名が入力されていません`);
    }

    setLoading(true);
    registerUser(externalID).then((v) => {
      setLoading(false);
      if (v) {
        navigate('/pretask');
      } else {
        toast.error('予期せぬエラーが発生しました');
      }
    });
  });

  return (
    <Container>
      <h1>検索タスク開始にあたって</h1>
      <Typography paragraph>
        本ウェブサイトは、{CROWDSOURCING_SITE}にて掲載している検索タスクを行っていただくためのサイトです。
      </Typography>

      <h2 style={{ marginTop: '50px' }}>検索タスクの流れ</h2>
      <Typography paragraph>
        本タスクでははじめにアンケートに回答していただきます。続いて検索タスクを行っていただきます。
        最後にもう一度アンケートに回答していただきます。タスク全体の想定時間は 20 分程度を想定しております。
      </Typography>

      <h2 style={{ marginTop: '50px' }}>注意事項</h2>
      <Typography paragraph>
        タスク中、ページ閲覧ログを収集させていただきます。
        収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
      </Typography>

      <Divider sx={{ marginX: '20px', marginY: '30px' }} />

      <Typography paragraph>
        以上に同意していただける方は、以下の入力欄に「{CROWDSOURCING_SITE}ユーザ名」を入力し、
        「タスクを開始する」ボタンをクリックしてタスクを開始してください。
      </Typography>

      <form onSubmit={onSubmit}>
        <InputLabel htmlFor="externalId">
          {CROWDSOURCING_SITE}ユーザ名（ユーザ名は半角英数字と記号 (-_) を用いて入力してください）
        </InputLabel>
        <TextField
          id="externalId"
          size="small"
          pattern="[0-9a-zA-Z-_]*([ \.][0-9a-zA-Z-_]+)*"
          {...register('externalID')}
          sx={{ width: '360px' }}
        />
        {errors.externalID && <p style={{ color: 'red' }}>{errors.externalID.message}</p>}
        <Box sx={{ mt: '20px' }}>
          <Button
            type="submit"
            // To avoid changing button size by inner elements(text or progress),
            // fix button size here.
            style={{ height: '48px', width: '160px' }}
            onClick={() => {
              setError('externalID', { type: 'manual', message: '必須項目です' });
            }}
          >
            {isLoading ? <ComponentLoadingCenter /> : 'タスクを開始する'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};
