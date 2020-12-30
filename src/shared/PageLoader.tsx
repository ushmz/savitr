import React from 'react';

export const PageLoader = () => (
  <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
