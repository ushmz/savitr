import React from 'react';
import styled from 'styled-components';

type SearchResultSingleProps = {
  title: string;
  url: string;
  snippet: string;
  suggestion: {
    title: string;
    child: JSX.Element;
  };
};

export const SearchResultSingle: React.FC<SearchResultSingleProps> = (props) => {
  return (
    <StyledRootContainer className="g">
      <StyledPageInfoArea>
        <StyledAnchor href={props.url} target="_blank" rel="noreferrer">
          <br />
          <h3 style={styles.pageTitle}>{props.title}</h3>
          <div style={styles.pageUrlPosition}>
            <cite style={styles.pageUrlCite}>
              {props.url}
              <span></span>
            </cite>
          </div>
        </StyledAnchor>
      </StyledPageInfoArea>
      <StyledPageSnippetArea>{props.snippet}</StyledPageSnippetArea>
      <StyledSuggestionArea>
        <h4 style={styles.suggestionTitle}>{props.suggestion.title}</h4>
        <div style={styles.suggestionComponent}>{props.suggestion.child}</div>
      </StyledSuggestionArea>
    </StyledRootContainer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageTitle: {
    fontSize: '20px',
    lineHeight: 1.3,
    fontWeight: 'normal',
    margin: 0,
    padding: 0,
  },
  pageUrlPosition: {
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'inline-block',
    paddingBottom: '2px',
    paddingTop: '1px',
    WebkitTextSizeAdjust: 'none',
  },
  pageUrlCite: {
    paddingTop: '1px',
    fontSize: '14px',
    lineHeight: 1.3,
    color: '#202124',
    fontStyle: 'normal',
  },
  suggestionTitle: {
    marginBottom: '4px',
    marginLeft: 0,
    marginTop: '14px',
    color: 'rgba(0, 0, 0, 0.57)',
    margin: '12px 0px',
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  suggestionComponent: {
    maxHeight: '72px',
    whiteSpace: 'nowrap',
    lineHeight: '24px',
    marginLeft: 0,
    overflowX: 'hidden',
    paddingLeft: 0,
    paddingRight: 0,
    width: 'calc(100% - 24px)',
    display: 'inline-block',
    overflowY: 'hidden',
  },
};

const StyledAnchor = styled.a`
  color: #1a0dab;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  background-color: transparent;
`;

const StyledRootContainer = styled.div`
  width: 600px;
  margin-top: 0;
  margin-bottom: 30px;
  line-height: 1.6;
  text-align: left;
  font-family: arial, sans-serif;
  font-size: 14px;
  position: relative;
`;

const StyledPageInfoArea = styled.div`
  font-weight: normal;
  font-size: small;
  line-height: 1.58;
`;

const StyledPageSnippetArea = styled.div`
  max-width: 48em;
  color: #4d5156;
  line-height: 1.58;
  display: block;
`;

const StyledSuggestionArea = styled.div`
  display: block;
  opacity: 1;
  box-shadow: none;
  margin-top: 8px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  outline: none;
  position: relative;
  top: 2px;
  transform-origin: top left;
  transition: all 150ms ease-in-out;
  white-space: nowrap;

  padding-left: 15px;
  background-color: transparent;
  transform-origin: top;
`;
