import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from 'shared/provider/authProvider';
import { toast } from 'react-toastify';

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
  const history = useHistory();
  const auth = useAuth();

  const onSubmit = handleSubmit(({ externalId, passwd }) => {
    setLoading(true);
    const email = externalId + '@savitr.dummy.com';
    auth
      .signUp(email, passwd)
      .then(() => {
        toast.success('アカウント登録が完了しました');
        setLoading(false);
        history.push('/user');
      })
      .catch((e) => {
        toast.error('アカウント登録に失敗しました', e);
        setLoading(false);
      });
  });

  return (
    <MDBContainer>
      <MDBCard className="mx-auto mt-5" style={{ width: '500px' }}>
        <MDBCardTitle className="mx-auto mt-3">アカウント登録</MDBCardTitle>
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
              <MDBBtn
                type="submit"
                color="primary"
                invalid={(!formState.isValid).toString()}
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
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
        <p className="mx-auto my-3" style={{ fontSize: '85%' }}>
          アカウントをお持ちの方は<Link to="/signin">ログイン</Link>
        </p>
      </MDBCard>
    </MDBContainer>
  );
};
