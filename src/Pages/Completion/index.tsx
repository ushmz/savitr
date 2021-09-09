import React, { useEffect, useState } from 'react';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';
import { Completion as Component } from 'Pages/Completion/Completion';
import { fetchCompletionCode } from 'shared/apis';

export const Completion: React.FC = () => {
  const [compCode, setCompCode] = useState<number>(99999);
  useEffect(() => {
    const user = localStorage.getItem('user');
    fetchCompletionCode(user || '')
      .then((v) => setCompCode(v))
      .then(() => localStorage.clear());
  }, []);
  return compCode !== null ? <Component compCode={compCode} /> : <ComponentLoaderCenter />;
};
