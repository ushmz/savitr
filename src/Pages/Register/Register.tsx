import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../shared/provider/authProvider';
import { toast } from 'react-toastify';
import { createUser } from '../../shared/apis/apis';

type SigninParam = {
  externalId: string;
  passwd: string;
};

export const Register: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<SigninParam>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const auth = useAuth();

  const onSubmit = handleSubmit(({ externalId }) => {
    setLoading(true);
    createUser(externalId)
      .then((v) => {
        if (v.externalId === '') {
          toast.error('タスクができるのは 1 人 1 度までとなります');
          setLoading(false);
          return;
        }
        const email = externalId + '@savitr.dummy.com';
        auth
          .signUp(email, v.secret)
          .then(() => {
            setLoading(false);
            history.push('/upload');
          })
          .catch((res) => {
            toast.error(`登録に失敗しました : ${res}`);
            setLoading(false);
          });
      })
      .catch((res) => {
        toast.error(`予期せぬエラーが発生しました : ${res}`);
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

            <div className="text-center">
              <MDBBtn type="submit" color="primary">
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  '登録'
                )}
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};