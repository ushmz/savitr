import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Auth } from '../Pages/Auth/Auth';
import { Introduction } from '../Pages/Introduction';
import { PostTask } from '../Pages/PostTask';
import { PreTask } from '../Pages/PreTask';
import { Task } from '../Pages/Task';
import { Search } from '../Pages/Search';
import { Top } from '../Pages/Top';
import { User } from '../Pages/User';
import { NotFound } from '../Pages/NotFound';
import history from '../shared/browserHistory';

const Routes: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Top}></Route>

        <Auth>
          <Route exact path="/introduction/:taskid" component={Introduction}></Route>
          <Route exact path="/pretask" component={PreTask}></Route>
          <Route exact path="/posttask" component={PostTask}></Route>
          <Route exact path="/task/:taskid" component={Task}></Route>
          <Route exact path="/search/:taskid" component={Search}></Route>
          <Route exact path="/user" component={User}></Route>
        </Auth>

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
