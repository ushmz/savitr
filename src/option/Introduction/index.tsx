import React from 'react';
import { Pages } from 'shared/types';
import { PrimaryIntroduction } from './PrimaryIntroduction';
import { SecondaryIntroduction } from './SecondaryIntroduction';
import { ComponentLoaderCenter } from '../internal/ComponentLoader';

type Props = {
  taskNum: number;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Introduction: React.FC<Props> = ({ taskNum, setPage }) => {
  if (taskNum === 1) {
    return <PrimaryIntroduction setPage={setPage} />;
  } else if (taskNum === 2) {
    return <SecondaryIntroduction setPage={setPage} />;
  } else {
    return <ComponentLoaderCenter />;
  }
};
