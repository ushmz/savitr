import Box from '@mui/material/Box';
import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        mx: 'auto',
        my: '50px',
        maxWidth: '850px',
        display: 'block',
        padding: '10px',
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
