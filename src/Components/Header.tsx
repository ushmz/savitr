import React from 'react';
import { MDBNavbar, MDBNavbarNav, MDBNavItem } from 'mdbreact';
// import { useHistory } from 'react-router';
// import { useAuth } from '../shared/provider/authProvider';

export const Header: React.FC = () => {
  return (
    <MDBNavbar dark color="unique-color-dark" expand="sm">
      <MDBNavbarNav right>
        <MDBNavItem>
          {/* <MDBBtn
		  className="white-text"
		  onClick={() => {
			  auth.signOut();
			  localStorage.removeItem('jwt');
			  history.push('/');
		  }}
		  >
	タスクを終了する
	</MDBBtn> */}
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};
