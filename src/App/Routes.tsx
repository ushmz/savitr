import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Auth } from 'pages/Auth/Auth';
import { Completion } from 'pages/Completion';
import { Introduction } from 'pages/Introduction';
import { NotFound } from 'pages/NotFound';
import { PostTask } from 'pages/PostTask';
import { PreTask } from 'pages/PreTask';
import { ResultDocument } from 'pages/Result';
import { Search } from 'pages/Search';
import { Top } from 'pages/Top';

export const AppRoutes: React.FC = () => {
  return isMobile ? (
    <>
      <Card className="m-5">
        <CardHeader className="m-3">このページはパソコン専用です。</CardHeader>
        <CardContent className="mx=3">
          <p>本ウェブサイトは、クラウドワークスにて掲載している検索タスクを行っていただくためのサイトです。</p>
          <p>このページはパソコン専用です。このタスク行うにはパソコンからアクセスしてください。</p>
        </CardContent>
      </Card>
    </>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/error/:err" element={<NotFound />} />
        <Route
          path="/introduction/:taskid"
          element={
            <Auth>
              <Introduction />
            </Auth>
          }
        />
        <Route
          path="/pretask"
          element={
            <Auth>
              <PreTask />
            </Auth>
          }
        />
        <Route
          path="/posttask"
          element={
            <Auth>
              <PostTask />
            </Auth>
          }
        />
        <Route
          path="/search/:taskid"
          element={
            <Auth>
              <Search />
            </Auth>
          }
        />
        <Route
          path="/rslt"
          element={
            <Auth>
              <ResultDocument />
            </Auth>
          }
        />
        <Route
          path="/compcode"
          element={
            <Auth>
              <Completion />
            </Auth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
