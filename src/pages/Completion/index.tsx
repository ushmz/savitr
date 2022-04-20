import React, { useEffect, useState } from 'react';

import { PageLoadingCenter } from 'components/Loader';
import { Completion as Component } from 'pages/Completion/Completion';
import { fetchCompletionCode } from 'shared/apis';
import { getUserID } from 'shared/utils';

export const Completion: React.FC = () => {
  const [compCode, setCompCode] = useState<number>(99999);
  useEffect(() => {
    const user = getUserID();
    fetchCompletionCode(user)
      .then((v) => setCompCode(v))
      .then(() => localStorage.clear());
  }, []);
  return compCode !== null ? <Component compCode={compCode} /> : <PageLoadingCenter />;
};
