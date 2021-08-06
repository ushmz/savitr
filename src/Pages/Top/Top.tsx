import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toppage } from 'Components/AdjustedComponents';
import { MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import { useAuth } from 'shared/provider/authProvider';
import { createUser } from '../../shared/apis/apis';
import { CROWDSOURCING_SITE } from '../../shared/config';

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
    const ext = externalId.replace(' ', '');
    if (ext === '') {
      toast.error(`${CROWDSOURCING_SITE}IDが入力されていません`);
      return;
    }
    setLoading(true);
    createUser(ext)
      .then((v) => {
        const email = ext + '@savitr.dummy.com';
        if (v.exist) {
          auth
            .signIn(email, v.secret)
            .then(() => {
              localStorage.setItem('uid', ext);
              localStorage.setItem('user', '' + v.user);
              localStorage.setItem('standby', '' + v.tasks[0]);
              localStorage.setItem('notyet', '' + v.tasks[1]);
              localStorage.setItem('condition', '' + v.condition);
              localStorage.setItem('group', '' + v.group);
              setLoading(false);
              history.push('/pretask');
            })
            .catch((_) => {
              toast.error(`予期せぬエラーが発生しました`);
              setLoading(false);
            });
        } else {
          auth
            .signUp(email, v.secret)
            .then(() => {
              localStorage.setItem('uid', ext);
              localStorage.setItem('user', '' + v.user);
              localStorage.setItem('standby', '' + v.tasks[0]);
              localStorage.setItem('notyet', '' + v.tasks[1]);
              localStorage.setItem('condition', '' + v.condition);
              localStorage.setItem('group', '' + v.group);
              setLoading(false);
              history.push('/pretask');
            })
            .catch((_) => {
              toast.error(`予期せぬエラーが発生しました`);
              setLoading(false);
            });
        }
      })
      .catch((res) => {
        toast.error(`予期せぬエラーが発生しました : ${res}`);
        setLoading(false);
      });
  });

  return (
    <Toppage className="mx-auto my-5">
      <h1 className="my-4">検索タスク開始にあたって</h1>
      <p>本ウェブサイトは、{CROWDSOURCING_SITE}にて掲載している検索タスクを行っていただくためのサイトです。</p>

      <p>
        本タスクでははじめにアンケートに回答していただきます。続いて検索タスクを行っていただきます。
        最後にもう一度アンケートに回答していただきます。タスク全体の想定時間は 20 分程度を想定しております。
      </p>

      <p>
        タスク中、ページ閲覧ログを収集させていただきます。
        収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
      </p>

      <p className="font-weight-bold">
        以上に同意していただける方は、以下の入力欄に「{CROWDSOURCING_SITE}ID」を入力し、
        「タスクを開始する」ボタンをクリックしてタスクを開始してください。
      </p>

      <form className="my-5" onSubmit={onSubmit}>
        <label htmlFor="externalId" className="font-weight-light">
          {CROWDSOURCING_SITE}ID（IDは半角英数字と記号を用いて入力してください）
        </label>
        <input
          id="externalId"
          className="mb-3 form-control"
          pattern="[0-9a-zA-Z-_]*([ \.][0-9a-zA-Z-_]+)*"
          style={{ width: '360px' }}
          {...register('externalId')}
        />
        {errors.externalId && <p style={{ color: 'red' }}>{errors.externalId.message}</p>}
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
