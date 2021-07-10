import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toppage } from 'Components/AdjustedComponents';
import { MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import { useAuth } from 'shared/provider/authProvider';
import { createUser } from '../../shared/apis/apis';

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
    const ext = externalId.trim();
    if (ext === '') {
      toast.error('ランサーズID（ユーザー名）が入力されていません');
      return;
    }
    setLoading(true);
    createUser(ext)
      .then((v) => {
        const email = ext + '@savitr.dummy.com';
        auth
          .signUp(email, v.secret)
          .then(() => {
            localStorage.setItem('standby', '' + v.tasks[0]);
            localStorage.setItem('notyet', '' + v.tasks[1]);
            localStorage.setItem('condition', '' + v.condition);
            localStorage.setItem('group', '' + v.group);
            setLoading(false);
            history.push('/pretask');
          })
          .catch((res) => {
            toast.error(`予期せぬエラーが発生しました : ${res}`);
            setLoading(false);
          });
      })
      .catch((res) => {
        toast.error(`予期せぬエラーが発生しました : ${res}`);
        setLoading(false);
      });
  });

  return (
    <Toppage className="mx-auto my-5">
      <h1 className="my-4">検索タスク開始にあたって</h1>
      <p>本ウェブサイトは、ランサーズにて掲載している検索タスクを行っていただくためのサイトです。</p>

      <p>
        本タスクでははじめにアンケートに回答していただきます。続いて検索タスクを行っていただきます。
        最後にもう一度アンケートに回答していただきます。タスク全体の想定時間は 30 分程度を想定しております。
      </p>

      <p>
        タスク中、ページ閲覧ログを収集させていただきます。
        収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
      </p>

      <p className="font-weight-bold">
        以上に同意していただける方は、以下の入力欄に「ランサーズID」を入力し、
        「タスクを開始する」ボタンをクリックしてタスクを開始してください。
      </p>

      <form className="my-5" onSubmit={onSubmit}>
        <label htmlFor="externalId" className="font-weight-light">
          ランサーズID（ユーザー名）
        </label>
        <input id="externalId" className="mb-3 form-control" style={{ width: '360px' }} {...register('externalId')} />
        {errors.externalId && <p>{errors.externalId.message}</p>}
        <div>
          <MDBBtn
            type="submit"
            color="primary"
            onClick={() => {
              setError('externalId', { type: 'manual', message: '必須項目です' });
            }}
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'タスクを開始する'
            )}
          </MDBBtn>
        </div>
      </form>
    </Toppage>
  );
};
