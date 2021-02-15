import { Introduction } from 'Pages/Introduction';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../shared/browserHistory';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="introduction" component={Introduction}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
