import React from 'react';

export const ComponentLoaderCenter = () => (
  <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export const ComponentLoader = () => (
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);
