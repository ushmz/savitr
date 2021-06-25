import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Introduction as Component } from './Introduction';
import { fetchTaskInfo, TaskInfo } from 'shared/apis/apis';

type Props = RouteComponentProps<{
  taskid?: string;
}>;

export const Introduction: React.FC<Props> = (props) => {
  const dummyTask: TaskInfo = {
    id: 0,
    conditionId: 0,
    query: 'dummyQuery',
    title: 'dummyTitle',
    description: 'dummyDescription',
    authorId: 'dummyAuthorId',
    searchUrl: 'dummySearchUrl',
    type: '',
  };

  const [task, setTask] = useState<TaskInfo>(dummyTask);

  const taskIdNum = parseInt(props.match.params.taskid || '0');

  useEffect(() => {
    fetchTaskInfo(taskIdNum).then((task) => {
      if (task) setTask(task);
    });
  }, [taskIdNum]);

  return <Component {...task} />;
};
