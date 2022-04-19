import React, { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from 'App/Routes';
import { ProvideAuth } from 'shared/provider/authProvider';
import 'sanitize.css';

const App = (): ReactElement => {
  return (
    <React.Fragment>
      <ProvideAuth>
        <AppRoutes />
        <ToastContainer />
      </ProvideAuth>
    </React.Fragment>
  );
};

export default App;
