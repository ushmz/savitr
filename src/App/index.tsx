import React from 'react';
import NormalizeStyle from './NormalizeStyle';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <React.Fragment>
      <NormalizeStyle />
      <Routes />
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
