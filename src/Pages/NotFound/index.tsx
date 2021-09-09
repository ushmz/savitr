import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { NotFound as Component } from 'Pages/NotFound/NotFound';

type Props = RouteComponentProps<{
  err?: string;
}>;

export const NotFound: React.FC<Props> = (props) => {
  const errId = props.match.params.err || '';
  switch (errId) {
    case '400':
      return <Component err={errId} message={'Could not find auth information'} />;
    case '403':
      return <Component err={errId} message={'Not permitted'} />;
    case '404':
      return <Component err={errId} message={'Route name error'} />;
    case '500':
      return <Component err={errId} message={'API response error'} />;
    default:
      return <Component err={'404'} message={'Route name error'} />;
  }
};
