import React, { useEffect, useState } from 'react';
import { fetchCompletionCode } from 'shared/apis/apis';
import { Completion as Component } from './Completion';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';

export const Completion: React.FC = () => {
  const [compCode, setCompCode] = useState<number | null>(null);
  useEffect(() => {
    const user = localStorage.getItem('user');
    fetchCompletionCode(user || '').then((v) => setCompCode(v));
  }, []);
  return compCode !== null ? <Component compCode={compCode} /> : <ComponentLoaderCenter />;
};
