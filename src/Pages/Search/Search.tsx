import { MDBRow } from 'mdbreact';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Serp, TaskInfo } from '../../shared/apis/apis';
import { SearchResultUnit } from './Internal/SearchResult';
import { SerpPagination } from './Internal/Pagination';
import { SearchBar } from './Internal/SearchBar';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';

type SearchTaskProps = {
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  pageList: Serp[];
  task: TaskInfo;
  getTimeOnPage: () => number;
  isLoading: boolean;
};

export const SearchResultPage: React.FC<SearchTaskProps> = (props) => {
  return (
    <>
      <MDBRow>
        <StyledSearchBarContainer>
          <SearchBar query={props.task.query} />
        </StyledSearchBarContainer>
      </MDBRow>
      <br />
      <StyledDivider />
      {props.isLoading ? (
        <ComponentLoaderCenter />
      ) : (
        <>
          <StyledAppBarContainer>{`${props.offset + 1}ページ / 10ページ`}</StyledAppBarContainer>
          <MDBRow>
            <StyledSearchResultContainer>
              {props.pageList.map((page, idx) => (
                <SearchResultUnit
                  key={idx}
                  page={page}
                  task={props.task}
                  rank={idx + 1}
                  offset={props.offset + 1}
                  getTimeOnPage={props.getTimeOnPage}
                />
              ))}
              <div role="navigation">
                <SerpPagination
                  task={props.task}
                  offset={props.offset}
                  setOffset={props.setOffset}
                  getTimeOnPage={props.getTimeOnPage}
                />
              </div>
            </StyledSearchResultContainer>
          </MDBRow>
        </>
      )}
    </>
  );
};

const StyledSearchBarContainer = styled.div`
  position: absolute;
  top: 20px;
  margin-top: 6px;
  position: relative;
  margin: 0 auto;
  margin-left: 133px;
`;

const StyledDivider = styled.div`
  border-bottom: 1px solid #dfe1e5;
  position: relative;
  z-index: 126;

  background: #fff;
  height: 44px;
  width: 100%;
  padding: 0;
  position: relative;
  white-space: nowrap;
`;

const StyledAppBarContainer = styled.div`
  position: relative;
  height: 43px;
  margin-left: 160px;
  font-size: 14px;
  color: #70757a;
  min-width: 652px;
  line-height: 43px;
`;

const StyledSearchResultContainer = styled.div`
  margin-left: 180px;
  padding-top: 20px;
`;
