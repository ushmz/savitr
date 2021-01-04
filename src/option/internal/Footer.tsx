import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';
import { SetPageProp } from '../../shared/types';

export const Footer: React.FC<SetPageProp> = ({ setPage }) => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <button onClick={() => setPage('Attention')}>はじめに</button>
        <button onClick={() => setPage('Introduntion')}>タスク説明</button>
        <button onClick={() => setPage('PreTask')}>事前アンケート</button>
        <button onClick={() => setPage('PostTask')}>事後アンケート</button>
        <button onClick={() => setPage('Task')}>タスク開始</button>
      </MDBContainer>
      <div className="footer-copyright text-center py-3"></div>
    </MDBFooter>
  );
};
