import React, { ReactElement } from 'react';
import NormalizeStyle from './NormalizeStyle';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProvideAuth } from '../shared/provider/authProvider';

const App = (): ReactElement => {
  return (
    <React.Fragment>
      <ProvideAuth>
        <NormalizeStyle />
        <Routes />
        <ToastContainer />
      </ProvideAuth>
    </React.Fragment>
  );
};

export default App;
