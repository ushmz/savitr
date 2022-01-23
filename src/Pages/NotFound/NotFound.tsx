import React from 'react';

import Container from 'Components/Container';

export const NotFound: React.FC<{ err?: string; message?: string }> = (props) => {
  return (
    <Container>
      <p>申し訳ありません．最初からやり直してください．</p>
      {props.err && <p>{`${props.err}: ${props.message}`}</p>}
    </Container>
  );
};
