import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from 'shared/provider/authProvider';
import { toast } from 'react-toastify';

type SigninParam = {
  externalId: string;
  passwd: string;
};

export const Signin: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<SigninParam>();
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
        history.push(`/user/${externalId}`);
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
            <input
              id="externalId"
              name="externalId"
              ref={register({ required: true })}
              className="mb-3 mt-0 form-control"
            />
            <ErrorMessage errors={errors} name="externalId" as="p" message="必須項目です" style={{ color: 'red' }} />

            <label htmlFor="passwd" className="grey-text font-weight-light">
              パスワード
            </label>
            <input
              id="passwd"
              name="passwd"
              ref={register({ required: true, min: 8 })}
              className="mb-3 mt-0 form-control"
              type="password"
            />
            <ErrorMessage
              errors={errors}
              name="passwd"
              as="p"
              message="パスワードは必須項目かつ8文字以上が必要です"
              style={{ color: 'red' }}
            />
            <div className="text-center">
              <MDBBtn type="submit" color="primary">
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
