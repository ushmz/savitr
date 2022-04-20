import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Introduction as Component } from 'pages/Introduction/Introduction';
import { fetchTaskInfo } from 'shared/apis';
import { TaskInfo } from 'shared/types';

export const Introduction: React.FC = () => {
  const navigate = useNavigate();
  const dummyTask: TaskInfo = {
    id: 0,
    query: '',
    title: '',
    description: '',
    searchUrl: '',
  };

  const [task, setTask] = useState<TaskInfo>(dummyTask);

  const params = useParams();
  const taskIdNum = parseInt(params.taskid || '0');

  useEffect(() => {
    fetchTaskInfo(taskIdNum)
      .then((task) => {
        if (task) setTask(task);
      })
      .catch(() => {
        navigate('/error/500');
      });
    window.scrollTo(0, 0);
  }, [taskIdNum]);

  return <Component {...task} />;
};
