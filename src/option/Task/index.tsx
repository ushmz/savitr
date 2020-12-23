import React from 'react';
import { Pages } from 'shared/types';
import { Task as Component } from './Task';

const resultList = [
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトル',
    cookies: [],
    linkedPages: [
      { title: 'やばいページ', url: 'https://example.com/yabai' },
      { title: 'エグいページ', url: 'https://example.com/egui' },
      { title: 'エモいページ', url: 'https://example.com/emoi' },
    ],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサン',
    cookies: [],
    linkedPages: [
      { title: 'やばいページ', url: 'https://example.com/yabai' },
      { title: 'エモいページ', url: 'https://example.com/emoi' },
    ],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサン',
    cookies: [],
    linkedPages: [
      { title: 'エグいページ', url: 'https://example.com/egui' },
      { title: 'エモいページ', url: 'https://example.com/emoi' },
    ],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトル',
    cookies: [],
    linkedPages: [],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサン',
    cookies: [],
    linkedPages: [
      { title: 'やばいページ', url: 'https://example.com/yabai' },
      { title: 'エグいページ', url: 'https://example.com/egui' },
      { title: 'エモいページ', url: 'https://example.com/emoi' },
    ],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトル',
    cookies: [],
    linkedPages: [],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトル',
    cookies: [],
    linkedPages: [
      { title: 'やばいページ', url: 'https://example.com/yabai' },
      { title: 'エモいページ', url: 'https://example.com/emoi' },
    ],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサン',
    cookies: [],
    linkedPages: [{ title: 'エモいページ', url: 'https://example.com/emoi' }],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサン',
    cookies: [],
    linkedPages: [
      { title: 'やばいページ', url: 'https://example.com/yabai' },
      { title: 'エグいページ', url: 'https://example.com/egui' },
    ],
  },
  {
    title: 'サンプルページタイトル',
    url: 'https://example.com/hoge/fuga/bar/',
    snippet:
      'サンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトルサンプルページタイトル',
    cookies: [],
    linkedPages: [
      { title: 'エグいページ', url: 'https://example.com/egui' },
      { title: 'エモいページ', url: 'https://example.com/emoi' },
    ],
  },
];

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Task: React.FC<Props> = ({ setPage }) => {
  return <Component setPage={setPage} resultPages={resultList} />;
};
