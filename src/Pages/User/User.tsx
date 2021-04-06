import { MDBBtn } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'shared/provider/authProvider';

export const User: React.FC<{ username: string }> = ({ username }) => {
  const history = useHistory();
  const auth = useAuth();
  return (
    <>
      {username}
      <MDBBtn color="primary" onClick={() => history.push(`${username}/upload`)}>
        Upload
      </MDBBtn>
      <MDBBtn color="primary" onClick={() => history.push('/pretask')}>
        introduction
      </MDBBtn>
      <MDBBtn color="secondary" onClick={() => {
		  auth.signOut();
		  localStorage.removeItem('jwt');
		  history.push('/');
	  }}>
        ログアウト
      </MDBBtn>
    </>
  );
};
