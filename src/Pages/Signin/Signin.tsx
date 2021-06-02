import { useForm } from 'react-hook-form';
import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from 'shared/provider/authProvider';
import { toast } from 'react-toastify';

type SigninParamName = 'externalId' | 'passwd';

type SigninParam = {
  externalId: string;
  passwd: string;
};

export const Signin: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SigninParam>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const auth = useAuth();

  const onSubmit = handleSubmit(({ externalId, passwd }) => {
    setLoading(true);
    const email = externalId + '@savitr.dummy.com';
    auth
      .signIn(email, passwd)
      .then(() => {
        setLoading(false);
        history.push('/user');
      })
      .catch((e) => {
        toast.error('ID または パスワードが正しくありません', e);
        setLoading(false);
      });
  });

  return (
    <MDBContainer>
      <MDBCard className="mx-auto mt-5" style={{ width: '500px' }}>
        <MDBCardTitle className="mx-auto mt-3">ログイン</MDBCardTitle>
        <MDBCardBody>
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
            <div className="text-center">
              <MDBBtn
                type="submit"
                color="primary"
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
                  ].forEach(({ type, name, message }) => {
                    const param = name as SigninParamName;
                    setError(param, { type, message });
                  });
                }}
              >
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  'ログイン'
                )}
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
        <p className="mx-auto my-3" style={{ fontSize: '85%' }}>
          アカウントをお持ちでない方は<Link to="/signup">アカウント登録</Link>
        </p>
      </MDBCard>
    </MDBContainer>
  );
};
