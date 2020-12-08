import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Attention } from './Attention';
import { Introduction } from './Introduction';
import { PreTask } from './PreTask';
import { Task } from './Task';
import { PostTask } from './PostTask';

type Pages = 'Attention' | 'Introduntion' | 'PreTask' | 'Task' | 'PostTask';

const Option = () => {
  const [page, setpage] = useState<Pages>('Attention');

  const pagination = () => {
    switch (page) {
      case 'Attention':
        return <Attention setPage={setpage} />;
      case 'Introduntion':
        return <Introduction setPage={setpage} />;
      case 'PreTask':
        return <PreTask setPage={setpage} />;
      case 'Task':
        return <Task setPage={setpage} />;
      case 'PostTask':
        return <PostTask setPage={setpage} />;
      default:
        return <Attention setPage={setpage} />;
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setpage('Attention');
        }}
      >
        はじめに
      </button>
      <button
        onClick={() => {
          setpage('Introduntion');
        }}
      >
        タスク説明
      </button>
      <button
        onClick={() => {
          setpage('PreTask');
        }}
      >
        事前アンケート
      </button>
      <button
        onClick={() => {
          setpage('PostTask');
        }}
      >
        事後アンケート
      </button>
      <button
        onClick={() => {
          setpage('Task');
        }}
      >
        タスク開始
      </button>
      {pagination()}
    </>
  );
};

ReactDOM.render(<Option />, document.getElementById('root'));
