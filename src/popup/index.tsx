import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <>
      <div>App</div>
      <button
        type="submit"
        onClick={(event) => {
          chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/option.html` });
        }}
      >
        実験開始
      </button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
