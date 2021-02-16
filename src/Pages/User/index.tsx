import React from 'react';
import { User as Component } from './User';
import { RouteComponentProps } from 'react-router-dom';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';

type Props = RouteComponentProps<{ username: string }>;

export const User: React.FC<Props> = (props) => {
  const username = props.match.params.username;

  return username ? <Component username={username} /> : <ComponentLoaderCenter />;
};
