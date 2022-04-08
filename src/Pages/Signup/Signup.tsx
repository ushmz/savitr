import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type SignUpParamName = 'externalId' | 'passwd' | 'passwdConfirm';

type SignUpParam = {
  externalId: string;
  passwd: string;
  passwdConfirm: string;
};

export const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    formState: { errors },
  } = useForm<SignUpParam>();
  const [isLoading, setLoading] = useState<boolean>(false);
  // const navigate = useNavigate();
  // const auth = useAuth();

  const onSubmit = handleSubmit(({ externalId, passwd }) => {
    // setLoading(true);
    // const email = externalId + '@savitr.dummy.com';
    // auth
    //   .signUp(email, passwd)
    //   .then(() => {
    //     toast.success('アカウント登録が完了しました');
    //     setLoading(false);
    //     navigate('/user');
    //   })
    //   .catch((e) => {
    //     toast.error('アカウント登録に失敗しました', e);
    //     setLoading(false);
    //   });
  });

  return (
    <Container>
      <Card className="mx-auto mt-5" style={{ width: '500px' }}>
        <CardHeader className="mx-auto mt-3">アカウント登録</CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <label htmlFor="externalId" className="grey-text font-weight-light">
              ランサーズID（ユーザー名）
            </label>
            <input id="externalId" className="mb-3 mt-0 form-control" {...register('externalId')} />
            {errors.externalId && <p>{errors.externalId.message}</p>}
            <label htmlFor="passwd" className="grey-text font-weight-light">
              パスワード
            </label>
            <input id="passwd" className="mb-3 mt-0 form-control" type="password" {...register('passwd')} />
            {errors.passwd && <p>{errors.passwd.message}</p>}
            <label htmlFor="passwdConfirm" className="grey-text font-weight-light">
              パスワード（確認）
            </label>
            <input
              id="passwdConfirm"
              className="mb-3 mt-0 form-control"
              type="password"
              {...register('passwdConfirm')}
            />
            {errors.passwdConfirm && <p>{errors.passwdConfirm.message}</p>}
            <div className="text-center">
              <Button
                // type="submit"
                // color="primary"
                disabled={!formState.isValid}
                onClick={() => {
                  [
                    {
                      type: 'manual',
                      name: 'externalId',
                      message: '必須項目です',
                    },
                    {
                      type: 'manual',
                      name: 'passwd',
                      message: '必須項目です',
                    },
                    {
                      type: 'manual',
                      name: 'passwdConfirm',
                      message: '一致しません',
                    },
                  ].forEach(({ type, name, message }) => {
                    const param = name as SignUpParamName;
                    setError(param, { type, message });
                  });
                }}
              >
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  '作成'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <p className="mx-auto my-3" style={{ fontSize: '85%' }}>
          アカウントをお持ちの方は<Link to="/signin">ログイン</Link>
        </p>
      </Card>
    </Container>
  );
};
