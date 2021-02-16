import { MDBBtn } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const User: React.FC<{ username: string }> = ({ username }) => {
  const history = useHistory();
  return (
    <>
      {username}
      <MDBBtn color="primary" onClick={() => history.push(`${username}/upload`)}>
        Upload
      </MDBBtn>
      <MDBBtn color="primary" onClick={() => history.push('/pretask')}>
        introduction
      </MDBBtn>
    </>
  );
};
