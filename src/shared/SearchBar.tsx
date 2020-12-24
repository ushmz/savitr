import React from 'react';
import { MDBCol, MDBIcon, MDBNav, MDBNavbar, MDBNavbarBrand, MDBNavItem, MDBRow } from 'mdbreact';
import { Inlinediv, Moveddiv, SearchBarContainer } from './AdjustedComponents';

type Props = {
  title: string;
};

export const SearchHeader: React.FC<Props> = ({ title }) => {
  return (
    <MDBNavbar
      light
      className="nav-pills nav-fill"
      color="white"
      expand="md"
      fixed="top"
      scrolling
      scrollingNavbarOffset={50}
      tag="div"
    >
      <MDBNavbarBrand>{title}</MDBNavbarBrand>
      <MDBNavItem tag="div">
        <SearchBarContainer>
          <Inlinediv>
            <input className="form-control" type="text" placeholder="ウェブカメラ おすすめ" />
            <Moveddiv>
              <Inlinediv>
                <MDBIcon icon="times" size="lg" className="mx-1" />
                <div className="border-left border-dark">
                  <MDBIcon icon="microphone" size="lg" className="mx-1" />
                </div>
                <MDBIcon icon="search" className="indigo-text mx-1" size="lg" />
              </Inlinediv>
            </Moveddiv>
          </Inlinediv>
        </SearchBarContainer>
      </MDBNavItem>
      {/* <div className="text-center py-3"></div> */}
    </MDBNavbar>
  );
};
