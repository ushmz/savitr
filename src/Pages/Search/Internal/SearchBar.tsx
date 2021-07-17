import React from 'react';
import styled from 'styled-components';

type SearchHeaderProps = {
  query: string;
};

export const SearchBar: React.FC<SearchHeaderProps> = ({ query }) => {
  return (
    <StyledRootContainer>
      <form action="/" method="GET">
        <div style={{ display: 'flex' }}>
          <div style={styles.textInputContentPosition}>
            <StyledInput disabled className="" name="q" type="text" value={query} />
            <div style={styles.iconWithDividerPosition}>
              <div style={styles.inputIconPosition}>
                <span style={styles.svgIconAppearance}>
                  <StyledSvg
                    style={{ color: '#70757a' }}
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d={CROSS_SVG_PATH}></path>
                  </StyledSvg>
                </span>
                <Divider />
              </div>
            </div>
          </div>
          <StyledButton disabled className="Tg7LZd" aria-label="検索">
            <div style={styles.submitIconPosition}>
              <span style={styles.svgIconAppearance}>
                <StyledSvg
                  style={{ color: '#4285f4' }}
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d={SEARCH_SVG_PATH}></path>
                </StyledSvg>
              </span>
            </div>
          </StyledButton>
        </div>
      </form>
    </StyledRootContainer>
  );
};

const CROSS_SVG_PATH = `
M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 
17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z
`;

const SEARCH_SVG_PATH = `
M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 
9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 
4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 
0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 
9.5 11.99 14 9.5 14z
`;

const StyledRootContainer = styled.div`
  margin-top: 6px;
  margin-left: 12px;
  display: block;
  width: 692px;
  display: flex;
  border: 1px solid transparent;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  height: 44px;
  border-radius: 24px;
  z-index: 3;
`;

const StyledInput = styled.input`
  height: 44px !important;
  width: 577px;
  line-height: 39px;
  margin-top: -42px;
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.87);
  word-wrap: break-word;
  display: flex;
  flex: 100%;
  -webkit-tap-highlight-color: transparent;
  font-size: 16px;
  font: 16px arial, sans-serif;
`;

const StyledSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const StyledButton = styled.button`
  flex: 0 0 auto;
  padding-right: 13px;
  height: 44px;
  /* width: 44px; */
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Divider = styled.span`
  border-left: 1px solid #dfe1e5;
  height: 65%;
`;

const styles: { [key: string]: React.CSSProperties } = {
  textInputContentPosition: {
    flex: 1,
    display: 'flex',
    padding: '0 4px 0 16px',
    paddingLeft: '14px',
  },
  iconWithDividerPosition: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  inputIconPosition: {
    display: 'flex',
    flex: '1 0 auto',
    cursor: 'pointer',
    alignItems: 'center',
    border: 0,
    background: 'transparent',
    outline: 'none',
    padding: '0 8px',
    lineHeight: '44px',
  },
  submitIconPosition: {
    background: 'none',
    height: '24px',
    width: '24px',
    margin: 'auto',
  },
  svgIconAppearance: {
    marginRight: '12px',
    height: '100%',
    verticalAlign: 'middle',
    display: 'inline-block',
    fill: 'currentColor',
    lineHeight: '24px',
    position: 'relative',
    width: '24px',
  },
};
