import { ErrorMessage } from '@hookform/error-message';
import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from 'shared/provider/authProvider';
import { toast } from 'react-toastify';

type SignUpParam = {
  externalId: string;
  passwd: string;
};

export const Signup: React.FC = () => {
  const { register, handleSubmit, formState, errors } = useForm<SignUpParam>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const auth = useAuth();

  const onSubmit = handleSubmit(({ externalId, passwd }) => {
    setLoading(true);
    const email = externalId + '@gmail.com';
    auth
      .signUp(externalId, email, passwd)
      .then(() => {
        toast.success('アカウント登録が完了しました');
        setLoading(false);
        history.push(`/user/${externalId}`);
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
            <label htmlFor="passwdConfirm" className="grey-text font-weight-light">
              パスワード（確認）
            </label>
            <input
              id="passwdConfirm"
              name="passwdConfirm"
              ref={register({ required: true, min: 8 })}
              className="mb-3 mt-0 form-control"
              type="password"
            />
            <div className="text-center">
              <MDBBtn type="submit" color="primary" invalid={(!formState.isValid).toString()}>
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
      <Link to="/user/rabhareit">
        <MDBBtn color="primary">User Home</MDBBtn>
      </Link>
    </MDBContainer>
  );
};
