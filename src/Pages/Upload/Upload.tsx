import { MDBBtn } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const Upload: React.FC = () => {
  const history = useHistory();
  return (
    <>
      User Home
      <MDBBtn color="primary" onClick={() => history.goBack()}>
        User Home
      </MDBBtn>
    </>
  );
};
