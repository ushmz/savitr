import { Container } from '@mui/material';
import React from 'react';

export const NotFound: React.FC<{ err?: string; message?: string }> = (props) => {
  return (
    <Container className="m-5">
      <p>申し訳ありません．最初からやり直してください．</p>
      {props.err && <p>{`${props.err}: ${props.message}`}</p>}
    </Container>
  );
};
