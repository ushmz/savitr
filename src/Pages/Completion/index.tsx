import React, { useEffect, useState } from 'react';
import { fetchCompletionCode } from 'shared/apis/apis';
import { useAuth } from 'shared/provider/authProvider';
import { Completion as Component } from './Completion';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';

export const Completion: React.FC = () => {
  const auth = useAuth();
  const [compCode, setCompCode] = useState<number | null>(null);
  useEffect(() => {
    const uid = auth.user?.email?.split('@')[0];
    fetchCompletionCode(uid || '').then((v) => setCompCode(v));
  });
  return compCode !== null ? <Component compCode={compCode} /> : <ComponentLoaderCenter />;
};
