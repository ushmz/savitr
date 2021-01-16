import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Attention } from './AttentionControled';
import { Introduction } from './IntroductionControled';
import { PreTask } from './PreTask';
import { Task as PrimaryTask } from './Task/indexControled';
import { Task as SecondaryTask } from './Task2/indexControled';
import { PostTask } from './PostTaskControled';
import { Pages } from '../shared/types';
import { Header } from './internal/Header';

const Option = () => {
  const [page, setPage] = useState<Pages>('Attention');

  const pagination = () => {
    switch (page) {
      case 'Attention':
        return <Attention setPage={setPage} />;
      case 'Introduction1':
        return <Introduction taskNum={1} setPage={setPage} />;
      case 'Introduction2':
        return <Introduction taskNum={2} setPage={setPage} />;
      case 'PreTask':
        return <PreTask setPage={setPage} />;
      case 'Task1':
        return <PrimaryTask taskName="webcam" setPage={setPage} />;
      case 'Task2':
        return <SecondaryTask taskName="tounyou" setPage={setPage} />;
      case 'PostTask':
        return <PostTask />;
      default:
        return <Attention setPage={setPage} />;
    }
  };

  return <div className="mb-5 pb-5">{pagination()}</div>;
};

ReactDOM.render(<Option />, document.getElementById('root'));
