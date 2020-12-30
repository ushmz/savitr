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
import { Header } from './internal/Header';

type Pages = 'Attention' | 'Introduntion' | 'PreTask' | 'Task' | 'PostTask';

const Option = () => {
  const [page, setPage] = useState<Pages>('Attention');

  const pagination = () => {
    switch (page) {
      case 'Attention':
        return <Attention setPage={setPage} />;
      case 'Introduntion':
        return <Introduction setPage={setPage} />;
      case 'PreTask':
        return <PreTask setPage={setPage} />;
      case 'Task':
        return <Task setPage={setPage} />;
      case 'PostTask':
        return <PostTask setPage={setPage} />;
      default:
        return <Attention setPage={setPage} />;
    }
  };

  return (
    <>
      {page !== 'Task' && <Header title="Admin pagination" setPage={setPage}></Header>}
      <div className="mb-5 pb-5">{pagination()}</div>
    </>
  );
};

ReactDOM.render(<Option />, document.getElementById('root'));
