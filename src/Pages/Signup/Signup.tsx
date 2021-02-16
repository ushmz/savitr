import { MDBBtn } from 'mdbreact';
import React from 'react';
import { Link } from 'react-router-dom';

export const Signup: React.FC = () => {
  return (
    <>
      Signup
      <Link to="/user/rabhareit">
        <MDBBtn color="primary">User Home</MDBBtn>
      </Link>
    </>
  );
};
