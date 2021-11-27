import { MDBRow } from 'mdbreact';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Serp, TaskInfo } from 'shared/types';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';
import { SearchResultUnit } from 'Pages/Search/Internal/SearchResult';
import { SerpPagination } from 'Pages/Search/Internal/Pagination';
import { SearchHeader } from 'Pages/Search/Internal/SearchBarHeader';

type SearchTaskProps = {
  task: TaskInfo;
  pageList: Serp[];
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  getTimeOnPage: () => number;
  isLoading: boolean;
};

export const SearchResultPage: React.FC<SearchTaskProps> = (props) => {
  return (
    <>
      <SearchHeader query={props.task.query} />
      {props.isLoading ? (
        <ComponentLoaderCenter />
      ) : (
        <div>
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
              <SerpPagination
                task={props.task}
                offset={props.offset}
                setOffset={props.setOffset}
                getTimeOnPage={props.getTimeOnPage}
              />
            </StyledSearchResultContainer>
          </MDBRow>
        </div>
      )}
    </>
  );
};

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
