import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { parse } from 'query-string';
import { Introduction as Component } from './Introduction';
import tasks from '../../constants/tasks';
import { ComponentLoaderCenter } from '../../Components/ComponentLoader';
import { useAuth } from 'shared/provider/authProvider';
import { useHistory } from 'react-router-dom';
import { NotFound } from 'Pages/NotFound';

type Props = RouteComponentProps<{
  taskid?: string;
}>;

export const Introduction: React.FC<Props> = (props) => {
  const auth = useAuth();
  const history = useHistory();
  const [credential, setCredential] = useState<boolean>();

  const taskId = props.match.params.taskid;
  const searchParams = parse(props.location.search);
  const extid = searchParams.user as string;
  const secret = searchParams.secret as string;

  useEffect(() => {
    console.log(credential);
    auth
      .signIn(`${extid}@savitr.dummy.com`, secret)
      .then(() => setCredential(true))
      .catch(() => setCredential(false));
  }, []);

  if (taskId === '1' || taskId === '2') {
    if (credential === true) {
      return <Component task={tasks[+taskId - 1]} />;
    } else if (credential === undefined) {
      return <ComponentLoaderCenter />;
    } else {
      return <NotFound />;
    }
  } else {
    return <ComponentLoaderCenter />;
  }
};
