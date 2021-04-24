import { Attention } from '../Pages/Attention';
import { Auth } from '../Pages/Auth/Auth';
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
import { Register } from '../Pages/Register';
import { User } from '../Pages/User';
import { Upload } from '../Pages/Upload';
// import { Download } from '../Pages/Download';
import { NotFound } from '../Pages/NotFound';
import { DownloadHistory } from '../Pages/HowTo/DownloadHistory';
import { ExportHistory } from '../Pages/HowTo/ExportHistory';
import { Completion } from '../Pages/Completion';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Top}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/register" component={Register}></Route>

        <Auth>
          <Route exact path="/introduction/:taskid" component={Introduction}></Route>
          <Route exact path="/attention" component={Attention}></Route>
          <Route exact path="/how2exporthistory/tko" component={DownloadHistory}></Route>
          <Route exact path="/how2exporthistory/ext" component={ExportHistory}></Route>
          <Route exact path="/pretask" component={PreTask}></Route>
          <Route exact path="/posttask" component={PostTask}></Route>
          <Route exact path="/task/:taskid" component={Task}></Route>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/upload" component={Upload}></Route>
          <Route exact path="/upload/completion" component={Completion}></Route>
          {/* <Route exact path="/user/:username/download/crx" component={Download}></Route> */}
        </Auth>

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
