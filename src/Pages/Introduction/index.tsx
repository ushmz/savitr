import React from 'react';
import { Pages } from 'shared/types';
import { Introduction as Component } from './Introduction';
import scripts from './internal/scripts.json';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';

type Props = {
  taskNum: number;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

// TODO: Use react-router
export const Introduction: React.FC<Props> = ({ taskNum, setPage }) => {
  if (taskNum === 1 || taskNum === 2) {
    return <Component setPage={setPage} task={scripts[taskNum]} />;
  } else {
    return <ComponentLoaderCenter />;
  }
};
