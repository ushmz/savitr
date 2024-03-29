import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { MDBCol, MDBRow } from 'mdbreact';
import { createClickLog, Serp, SerpWithDistribution, SerpWithIcon, TaskInfo } from '../../../shared/apis/apis';
import { getConditionId, getUserId, isExperimentalGroup } from '../../../shared/util';
import { API_ENDPOINT } from '../../../shared/config';

type SearchResultProps = {
  page: Serp;
  task: TaskInfo;
  getTimeOnPage: () => number;
  rank: number;
  offset: number;
};

const getIconCache = (origin: string): string => {
  const prsr = new URL(origin);
  return `${API_ENDPOINT}/statics/${prsr.searchParams.get('h')}.png`;
};

export const SearchResultUnit: React.FC<SearchResultProps> = (props) => {
  const user = getUserId();
  const isExpGroup = isExperimentalGroup();
  const condition = getConditionId();

  const suggestionTitleFirst = isExpGroup
    ? `上のページを閲覧すると，以下の${condition == 7 ? 'カテゴリの' : ''}ウェブサイトでも`
    : '';

  const suggestionTitleLater = `上記ページの閲覧履歴を記録・分析される可能性があります${
    condition == 7 ? '（' + props.page.total + '件）' : ''
  }`;

  let suggestionArea: ReactElement | undefined = undefined;
  if (!isExpGroup) {
    suggestionArea =
      props.rank % 2 !== 0 ? (
        <p style={{ color: 'green' }}>上のページを閲覧すると，ページの閲覧履歴を記録・分析される可能性があります</p>
      ) : undefined;
  } else if (props.page.leaks && condition === 5) {
    suggestionArea =
      props.rank % 2 !== 0 && props.page.leaks.length > 0 ? (
        <IconSuggestionArea
          id={props.page.id}
          title={props.page.title}
          url={props.page.url}
          snippet={props.page.snippet}
          leaks={props.page.leaks}
          rank={props.rank}
        />
      ) : undefined;
  } else if (props.page.total && props.page.distribution) {
    suggestionArea =
      props.rank % 2 !== 0 && props.page.distribution.length > 0 ? (
        <DistributionSuggestionArea
          id={props.page.id}
          title={props.page.title}
          url={props.page.url}
          snippet={props.page.snippet}
          total={props.page.total}
          distribution={props.page.distribution}
        />
      ) : undefined;
  }

  return (
    <SearchResultSingle
      title={props.page.title}
      url={props.page.url}
      snippet={props.page.snippet}
      suggestion={
        suggestionArea
          ? {
              title: suggestionTitleFirst,
              secondaryTitle: suggestionTitleLater,
              child: suggestionArea,
            }
          : undefined
      }
      onResultClick={() => {
        createClickLog({
          user: user,
          taskId: props.task.id,
          conditionId: getConditionId(),
          time: props.getTimeOnPage(),
          rank: props.rank,
          page: props.offset,
          visible: props.rank % 2 === 1,
        });
      }}
    />
  );
};

const IconSuggestionArea: React.FC<SerpWithIcon & { rank: number }> = (props) => {
  return (
    <MDBRow style={{ marginLeft: '5px' }}>
      {Object.entries(props.leaks).map(([k, v]) => (
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
    </MDBRow>
  );
};

const DistributionSuggestionArea: React.FC<SerpWithDistribution> = (props) => {
  return (
    <MDBRow>
      {props.distribution.map((v, idx) => (
        <MDBCol key={idx}>
          {/* Set className="d-flex justify-content-center" to centerize */}
          <div style={styles.distributionSuggestionTitle}>{v.category}</div>
          <div style={styles.distributionSuggestionText}>{`${Math.ceil(v.pct * 1000) / 10}%（${v.count} 件）`}</div>
        </MDBCol>
      ))}
    </MDBRow>
  );
};

type SearchResultSingleProps = {
  onResultClick?: () => void;
  title: string;
  url: string;
  snippet: string;
  suggestion?: {
    title: string;
    secondaryTitle?: string;
    child?: JSX.Element;
    onClick?: () => void;
  };
};

export const SearchResultSingle: React.FC<SearchResultSingleProps> = (props) => {
  const buildTitle = () => {
    if (props.suggestion == null) return <></>;
    return props.suggestion.secondaryTitle ? (
      <>
        {props.suggestion.title}
        <br />
        {props.suggestion.secondaryTitle}
      </>
    ) : (
      <>{props.suggestion.title}</>
    );
  };

  return (
    <StyledRootContainer className="g">
      <StyledPageInfoArea>
        <StyledAnchor href={props.url} target="_blank" rel="noreferrer" onClick={props.onResultClick}>
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
      <StyledPageSnippetArea>{props.snippet.slice(0, 80) + '...'}</StyledPageSnippetArea>
      {props.suggestion && (
        <StyledSuggestionArea>
          <h4 style={styles.suggestionTitle}>{buildTitle()}</h4>
          <div style={styles.suggestionComponent} onClick={props.suggestion.onClick}>
            {props.suggestion.child}
          </div>
        </StyledSuggestionArea>
      )}
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
  suggestionTitle: {
    marginBottom: '4px',
    marginLeft: 0,
    marginTop: '14px',
    // color: 'rgba(0, 0, 0, 0.57)',
    color: 'rgba(0, 0, 0, 0.6)',
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
  distributionSuggestionTitle: {
    marginLeft: 0,
    color: 'rgba(90, 165, 90, 1.0)',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  distributionSuggestionText: {
    marginLeft: 0,
    color: 'rgba(0, 0, 0, 0.57)',
    fontSize: '14px',
    lineHeight: 1.2,
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
