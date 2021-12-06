import React from 'react';
import { SearchResult } from './SearchResult';

type BaseUIProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
};

export const BaseUI: React.FC<BaseUIProps> = (props) => {
  return (
    <>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div style={styles.nudge}>
        {/*<h4 style={styles.suggestionTitle}></h4>*/}
        <div>
          <p style={styles.warningMessage}>
            上のページを閲覧すると，ページの閲覧履歴を記録・分析される可能性があります
          </p>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nudge: {
    marginTop: '10px',
    padding: '8px 15px',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    position: 'relative',
    transition: 'all 150ms ease-in-out',
    transformOrigin: 'top',
  },
  warningMessage: {
    color: 'green',
    fontSize: '15px',
  },
};
