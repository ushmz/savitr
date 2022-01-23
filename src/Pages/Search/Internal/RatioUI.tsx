import React from 'react';

import { LinkedPageDistribution } from 'shared/types';

import { SearchResult } from './SearchResult';

type RatioUIProps = {
  title: string;
  url: string;
  snippet: string;
  linked: {
    total: number;
    distribution: LinkedPageDistribution[];
  };
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const RatioUI: React.FC<RatioUIProps> = (props) => {
  return (
    <div onMouseEnter={props.sendHoverLog}>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div style={styles.nudge}>
        <h4 style={styles.suggestionTitle}>
          上のページを閲覧すると，以下のウェブサイトでも
          <br />
          上記ページの閲覧履歴を記録・分析される可能性があります（{props.linked.total}件）
        </h4>

        <div style={styles.ratioContainer}>
          {props.linked.distribution.map((v, idx) => (
            <div key={idx} style={styles.ratioColumn}>
              {/* Set className="d-flex justify-content-center" to centerize */}
              <div style={styles.ratioCategory}>{v.category}</div>
              <div style={styles.ratio}>{`${Math.ceil((v.count / props.linked.total) * 1000) / 10}%（${
                v.count
              } 件）`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nudge: {
    marginTop: '10px',
    padding: '0 15px 8px',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    position: 'relative',
    transition: 'all 150ms ease-in-out',
    transformOrigin: 'top',
  },
  suggestionTitle: {
    margin: '8px 0',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  ratioContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  ratioColumn: {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%',
  },
  ratioCategory: {
    marginLeft: 0,
    color: 'rgba(90, 165, 90, 1.0)',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  ratio: {
    marginLeft: 0,
    color: 'rgba(0, 0, 0, 0.57)',
    fontSize: '14px',
    lineHeight: 1.2,
  },
};
