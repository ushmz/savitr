import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

// export const ComponentLoaderCenter = (): ReactElement => (
//   <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
//     <div className="spinner-border text-primary" role="status">
//       <span className="sr-only">Loading...</span>
//     </div>
//   </div>
// );
//
// export const ComponentLoader = (): ReactElement => (
//   <div className="spinner-border" role="status">
//     <span className="sr-only">Loading...</span>
//   </div>
// );

export const PageLoadingCenter = () => {
  return (
    <Box sx={{ p: 20, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={48} sx={{ top: '50%', left: '50%' }} />
    </Box>
  );
};

export const ComponentLoadingCenter = () => {
  return <CircularProgress size={24} sx={{ color: 'snow', top: '50%', left: '50%' }} />;
};
