import { Attention } from 'Pages/Attention';
import { Introduction } from 'Pages/Introduction';
import { PostTask } from 'Pages/PostTask';
import { PreTask } from 'Pages/PreTask';
import { Task } from 'Pages/Task';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../shared/browserHistory';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="introduction/:taskid" component={Introduction}></Route>
        <Route exact path="attention" component={Attention}></Route>
        <Route exact path="pretask" component={PreTask}></Route>
        <Route exact path="posttask" component={PostTask}></Route>
        <Route exact path="task/:taskid" component={Task}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
