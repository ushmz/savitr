import React from 'react';
import { SearchResult } from './SearchResult';
import { API_ENDPOINT } from 'shared/config';
import { SimilarwebPage } from 'shared/types';

type IconUIProps = {
  title: string;
  url: string;
  snippet: string;
  tracked: SimilarwebPage[];
  sendClickLog: () => void;
};

const getIconCache = (origin: string): string => {
  const prsr = new URL(origin);
  return `${API_ENDPOINT}/statics/${prsr.searchParams.get('h')}.png`;
};

export const IconUI: React.FC<IconUIProps> = (props) => {
  return (
    <>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div style={styles.nudge}>
        <h4 style={styles.suggestionTitle}>
          上のページを閲覧すると，以下のウェブサイトでも
          <br />
          上記ページの閲覧履歴を記録・分析される可能性があります
        </h4>
        <div style={styles.icons}>
          {Object.entries(props.tracked).map(([k, v]) => (
            <div key={k}>
              <a href={v.url} target="_blank" rel="noreferrer">
                <img
                  src={getIconCache(v.icon)}
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    // const leaksArea = document.getElementById('eob_21');
                    // if (leaksArea != null) {
                    //   leaksArea.style.display = 'none';
                    // }
                  }}
                  style={{ height: 30, objectFit: 'cover' }}
                />
              </a>
            </div>
          ))}
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
  suggestionTitle: {
    marginLeft: 0,
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  icons: {
    marginLeft: '5px',
    display: 'flex',
  },
};
