import React from 'react';
import { MDBBtn, MDBNavbar, MDBNavbarNav, MDBNavItem } from 'mdbreact';
import { useHistory } from 'react-router';
import { useAuth } from '../shared/provider/authProvider';

export const Header: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();

  return (
    <MDBNavbar dark color="unique-color-dark" expand="sm">
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBBtn
            className="white-text"
            onClick={() => {
              auth.signOut();
              localStorage.removeItem('jwt');
              history.push('/');
            }}
          >
            ログアウト
          </MDBBtn>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};
