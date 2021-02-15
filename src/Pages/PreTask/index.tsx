import React from 'react';
import { SetPageProp } from '../../shared/types';
import { PreTask as Component } from './PreTask';

type Props = {};

// TODO: Use react-router
export const PreTask: React.FC<SetPageProp> = ({ setPage }) => {
  return <Component setPage={setPage} />;
};
