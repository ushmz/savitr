import React from 'react';

type SearchResultProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  return (
    <div className="g" style={styles.searchResultContainer}>
      <div style={styles.pageInfo}>
        <a href={props.url} target="_blank" rel="noreferrer" style={styles.linkTitle} onClick={props.sendClickLog}>
          <br />
          <h3 style={styles.pageTitle}>{props.title}</h3>
          <div style={styles.pageUrlPosition}>
            <cite style={styles.pageUrlCite}>
              {props.url}
              <span></span>
            </cite>
          </div>
        </a>
      </div>
      <div style={styles.snippet}>{props.snippet.slice(0, 80) + '...'}</div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  searchResultContainer: {
    width: '600px',
    // marginTop: 0,
    // marginBottom: '30px',
    lineHeight: 1.6,
    textAlign: 'left',
    fontFamily: 'arial, sans-serif',
    fontSize: '14px',
    position: 'relative',
  },
  pageInfo: {
    fontWeight: 'normal',
    fontSize: 'small',
    lineHeight: 1.58,
  },
  linkTitle: {
    color: '#1a0dab',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)',
  },
  pageTitle: {
    fontSize: '20px',
    lineHeight: 1.3,
    fontWeight: 'normal',
    margin: 0,
    padding: 0,
    width: '600px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  pageUrlPosition: {
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'inline-block',
    paddingBottom: '2px',
    paddingTop: '1px',
    WebkitTextSizeAdjust: 'none',
    width: '600px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  pageUrlCite: {
    paddingTop: '1px',
    fontSize: '14px',
    lineHeight: 1.3,
    color: '#202124',
    fontStyle: 'normal',
  },
  snippet: {
    maxWidth: '48em',
    color: '#4d5156',
    lineHeight: 1.58,
    display: 'block',
  },
};
