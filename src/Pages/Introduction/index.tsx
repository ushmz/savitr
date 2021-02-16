import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Introduction as Component } from './Introduction';
import tasks from '../../constants/tasks';
import { ComponentLoaderCenter } from '../../Components/ComponentLoader';

type Props = RouteComponentProps<{ taskid?: string }>;

// TODO: Use react-router
export const Introduction: React.FC<Props> = (props) => {
  const taskId = props.match.params.taskid;
  if (taskId === '1' || taskId === '2') {
    return <Component task={tasks[+taskId - 1]} />;
  } else {
    return <ComponentLoaderCenter />;
  }
};
