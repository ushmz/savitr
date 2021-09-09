import React from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Router, Switch } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import { Auth } from 'Pages/Auth/Auth';
import { Completion } from 'Pages/Completion';
import { Introduction } from 'Pages/Introduction';
import { PostTask } from 'Pages/PostTask';
import { PreTask } from 'Pages/PreTask';
import { Search } from 'Pages/Search';
import { Top } from 'Pages/Top';
import { NotFound } from 'Pages/NotFound';
import history from 'shared/utils/browserHistory';

const Routes: React.FC = () => {
  return isMobile ? (
    <>
      <MDBCard className="m-5">
        <MDBCardTitle className="m-3">このページはパソコン専用です。</MDBCardTitle>
        <MDBCardBody className="mx=3">
          <p>本ウェブサイトは、クラウドワークスにて掲載している検索タスクを行っていただくためのサイトです。</p>
          <p>このページはパソコン専用です。このタスク行うにはパソコンからアクセスしてください。</p>
        </MDBCardBody>
      </MDBCard>
    </>
  ) : (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route exact path="/error/:err" component={NotFound} />
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
