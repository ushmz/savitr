import Typography from '@mui/material/Typography';
import React from 'react';

const Paragraph: React.FC = ({ children }) => {
  return <Typography sx={{ mt: '-10px', mb: '24px' }}>{children}</Typography>;
};

export default Paragraph;
