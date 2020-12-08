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
        return <Attention />;
      case 'Introduntion':
        return <Introduction />;
      case 'PreTask':
        return <PreTask />;
      case 'Task':
        return <Task />;
      case 'PostTask':
        return <PostTask />;
      default:
        return <Attention />;
    }
  };

  return (
    <>
      <div>Option page</div>
      {pagination()}
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
    </>
  );
};

ReactDOM.render(<Option />, document.getElementById('root'));
