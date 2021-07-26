import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Auth } from '../Pages/Auth/Auth';
import { Completion } from '../Pages/Completion';
import { Introduction } from '../Pages/Introduction';
import { PostTask } from '../Pages/PostTask';
import { PreTask } from '../Pages/PreTask';
import { Sample } from 'Pages/Sample';
import { Search } from '../Pages/Search';
import { Top } from '../Pages/Top';
import { NotFound } from '../Pages/NotFound';
import history from '../shared/browserHistory';

const Routes: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route exact path="/error/:err" component={NotFound} />
        <Route exact path="/search/sample" component={Sample} />
        <Auth>
          <Route exact path="/introduction/:taskid" component={Introduction} />
          <Route exact path="/pretask" component={PreTask} />
          <Route exact path="/posttask" component={PostTask} />
          <Route exact path="/search/:taskid" component={Search} />
          <Route exact path="/compcode" component={Completion} />
        </Auth>
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
