import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createUser } from 'shared/apis';
import { useAuth } from 'shared/provider/authProvider';

type RegisterParamName = 'externalId';

type RegisterParam = {
  externalId: string;
  passwd: string;
};

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterParam>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = handleSubmit(({ externalId }) => {
    setLoading(true);
    createUser(externalId)
      .then((v) => {
        const email = externalId + '@savitr.dummy.com';
        auth
          .signUp(email, v.secret)
          .then(() => {
            setLoading(false);
            navigate('/upload');
          })
          .catch(() => {
            auth
              .signIn(email, v.secret)
              .then(() => {
                setLoading(false);
                navigate('/upload');
              })
              .catch((resin) => {
                toast.error(`予期せぬエラーが発生しました : ${resin}`);
                setLoading(false);
              });
          });
      })
      .catch((res) => {
        toast.error(`予期せぬエラーが発生しました : ${res}`);
        setLoading(false);
      });
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
            <div className="text-center">
              <Button
                type="submit"
                color="primary"
                onClick={() => {
                  [
                    {
                      type: 'manual',
                      name: 'externalId',
                      message: '必須項目です',
                    },
                  ].forEach(({ type, name, message }) => {
                    const param = name as RegisterParamName;
                    setError(param, { type, message });
                  });
                }}
              >
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  '登録'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
