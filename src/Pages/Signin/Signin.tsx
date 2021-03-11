import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBInputGroup, MDBBtn } from 'mdbreact';
import React from 'react';
import { Link } from 'react-router-dom';

export const Signin: React.FC = () => {
  return (
    <MDBContainer>
      <MDBCard className="mx-auto mt-5" style={{ width: '500px' }}>
        <MDBCardTitle className="mx-auto mt-3">ログイン</MDBCardTitle>
        <MDBCardBody>
          <form action="" method="post">
            <MDBInputGroup material containerClassName="mb-3 mt-0" label="ランサーズID" hint="ランサーズID" />
            <MDBInputGroup
              material
              containerClassName="mb-3 mt-0"
              type="password"
              label="パスワード"
              hint="パスワード"
            />
            <div className="text-center">
              <MDBBtn type="submit" color="primary">
                ログイン
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
        <p className="mx-auto my-3" style={{ fontSize: '85%' }}>
          アカウントをお持ちでない方は<Link to="/signup"> アカウント作成</Link>
        </p>
      </MDBCard>
      <Link to="/user/rabhareit">
        <MDBBtn color="primary">User Home</MDBBtn>
      </Link>
    </MDBContainer>
  );
};
