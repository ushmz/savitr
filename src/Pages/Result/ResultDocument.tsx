import React from 'react';

type ResultDocumentProps = {
  url: string;
  // __html: string;
};
export const ResultDocument: React.FC<ResultDocumentProps> = (props) => {
  // console.log(props.__html);
  // return <div dangerouslySetInnerHTML={{ __html: props.__html }} />;
  return (
    <div style={{ overflow: 'scroll' }}>
      <iframe
        sandbox=""
        src={props.url}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          border: 'none',
        }}
      />
    </div>
  );
};
