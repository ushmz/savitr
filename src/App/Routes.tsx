import { Attention } from '../Pages/Attention';
import { Introduction } from '../Pages/Introduction';
import { PostTask } from '../Pages/PostTask';
import { PreTask } from '../Pages/PreTask';
import { Task } from '../Pages/Task';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../shared/browserHistory';
import { Top } from '../Pages/Top';
import { Signup } from '../Pages/Signup';
import { Signin } from '../Pages/Signin';
import { User } from '../Pages/User';
import { Upload } from '../Pages/Upload';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/introduction/:taskid" component={Introduction}></Route>
        <Route exact path="/attention" component={Attention}></Route>
        <Route exact path="/pretask" component={PreTask}></Route>
        <Route exact path="/posttask" component={PostTask}></Route>
        <Route exact path="/task/:taskid" component={Task}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/user/:username" component={User}></Route>
        <Route exact path="/user/:username/upload" component={Upload}></Route>
        <Route exact path="/" component={Top}></Route>
        <Route path="*" component={Top} />
      </Switch>
    </Router>
  );
};

export default Routes;
