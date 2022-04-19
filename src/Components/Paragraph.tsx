import Typography from '@mui/material/Typography';
import React from 'react';

type ParagraphProps = {
  children: React.ReactNode;
};

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return <Typography sx={{ mt: '-10px', mb: '24px' }}>{children}</Typography>;
};

export default Paragraph;
