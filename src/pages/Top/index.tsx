import React from 'react';

import { Top as Component } from 'pages/Top/Top';
import { createUser } from 'shared/apis';
import { useAuth } from 'shared/provider/authProvider';
import {
  setConditionID,
  setGroupID,
  setPrimaryTaskID,
  setSecondaryTaskID,
  setUID,
  setUserID,
} from 'shared/utils/webstorage';

export const Top: React.FC = () => {
  const auth = useAuth();

  const registerUser = async (externalID: string): Promise<boolean> => {
    const success = createUser(externalID)
      .then((v) => {
        auth.signIn(v.token);
        setUID(externalID);
        setUserID(v.user);
        setPrimaryTaskID(v.tasks[0]);
        setSecondaryTaskID(v.tasks[1]);
        setConditionID(v.condition);
        setGroupID(v.group);
        return true;
      })
      .catch(() => {
        return false;
      });
    return success;
  };

  return <Component registerUser={registerUser} />;
};
