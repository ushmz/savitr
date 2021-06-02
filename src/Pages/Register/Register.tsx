import { useForm } from 'react-hook-form';
import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBBtn } from 'mdbreact';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../shared/provider/authProvider';
import { toast } from 'react-toastify';
import { createUser } from '../../shared/apis/apis';

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
  const history = useHistory();
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
            history.push('/upload');
          })
          .catch(() => {
            auth
              .signIn(email, v.secret)
              .then(() => {
                setLoading(false);
                history.push('/upload');
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
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
