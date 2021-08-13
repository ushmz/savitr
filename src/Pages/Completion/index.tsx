import React, { useEffect, useState } from 'react';
import { fetchCompletionCode } from 'shared/apis/apis';
import { Completion as Component } from './Completion';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';

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
