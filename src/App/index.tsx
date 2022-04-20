import React, { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sanitize.css';

import { AppRoutes } from 'app/Routes';
import { ProvideAuth } from 'shared/provider/authProvider';

const App = (): ReactElement => {
  return (
    <ProvideAuth>
      <React.Fragment>
        <AppRoutes />
        <ToastContainer />
      </React.Fragment>
    </ProvideAuth>
  );
};

export default App;
