import React, { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import NormalizeStyle from 'App/NormalizeStyle';
import Routes from 'App/Routes';
import { ProvideAuth } from 'shared/provider/authProvider';

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
