import React, { ReactElement } from 'react';

export const ComponentLoaderCenter = (): ReactElement => (
  <div className="d-flex justify-content-center m-5" style={{ margin: 'auto' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export const ComponentLoader = (): ReactElement => (
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);
