import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Introduction as Component } from './Introduction';
import { fetchTaskInfo, TaskInfo } from 'shared/apis/apis';

type Props = RouteComponentProps<{
  taskid?: string;
}>;

export const Introduction: React.FC<Props> = (props) => {
  const history = useHistory();
  const dummyTask: TaskInfo = {
    id: 0,
    query: '',
    title: '',
    description: '',
    searchUrl: '',
  };

  const [task, setTask] = useState<TaskInfo>(dummyTask);

  const taskIdNum = parseInt(props.match.params.taskid || '0');

  useEffect(() => {
    fetchTaskInfo(taskIdNum)
      .then((task) => {
        if (task) setTask(task);
      })
      .catch(() => {
        history.push('/error/500');
      });
    window.scrollTo(0, 0);
  }, [taskIdNum]);

  return <Component {...task} />;
};
