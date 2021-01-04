import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from 'mdbreact';
import { Pages } from '../../shared/types';

type Props = {
  title: string;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Header: React.FC<Props> = ({ title, setPage }) => {
  return (
    <MDBNavbar color="blue" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">{title}</strong>
      </MDBNavbarBrand>
      <MDBNavbarNav left className={`${title.toLocaleLowerCase().match(/.*admin.*/) ? 'visible' : 'invisible'}`}>
        <MDBNavItem active>
          <div className="white-text mx-2" onClick={() => setPage('Attention')}>
            はじめに
          </div>
        </MDBNavItem>
        <MDBNavItem active>
          <div className="white-text mx-2" onClick={() => setPage('Introduntion')}>
            タスク説明
          </div>
        </MDBNavItem>
        <MDBNavItem active>
          <div className="white-text mx-2" onClick={() => setPage('PreTask')}>
            事前アンケート
          </div>
        </MDBNavItem>
        <MDBNavItem active>
          <div className="white-text mx-2" onClick={() => setPage('PostTask')}>
            事後アンケート
          </div>
        </MDBNavItem>
        <MDBNavItem active>
          <div className="white-text mx-2" onClick={() => setPage('Task')}>
            タスク開始
          </div>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};
