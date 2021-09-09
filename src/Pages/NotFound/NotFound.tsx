import React from 'react';
import { MDBContainer } from 'mdbreact';

export const NotFound: React.FC<{ err?: string; message?: string }> = (props) => {
  return (
    <MDBContainer className="m-5">
      <p>申し訳ありません．最初からやり直してください．</p>
      {props.err && <p>{`${props.err}: ${props.message}`}</p>}
    </MDBContainer>
  );
};
