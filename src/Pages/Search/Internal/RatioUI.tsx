import { MDBCol, MDBRow } from 'mdbreact';
import React from 'react';
import { SimilarwebDistribution } from 'shared/types';
import { SearchResult } from './SearchResult';

type RatioUIProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
  tracked: {
    total: number;
    distribution: SimilarwebDistribution[];
  };
};

export const RatioUI: React.FC<RatioUIProps> = (props) => {
  return (
    <>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div style={styles.nudge}>
        <h4 style={styles.suggestionTitle}>
          上のページを閲覧すると，以下のウェブサイトでも
          <br />
          上記ページの閲覧履歴を記録・分析される可能性があります（{props.tracked.total}件）
        </h4>

        <MDBRow>
          {props.tracked.distribution.map((v, idx) => (
            <MDBCol key={idx}>
              {/* Set className="d-flex justify-content-center" to centerize */}
              <div style={styles.ratioCategory}>{v.category}</div>
              <div style={styles.ratio}>{`${Math.ceil(v.pct * 1000) / 10}%（${v.count} 件）`}</div>
            </MDBCol>
          ))}
        </MDBRow>
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
  suggestionTitle: {
    marginBottom: '8px',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: 1.2,
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
