import { MDBRow } from 'mdbreact';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Serp, TaskInfo } from '../../shared/apis/apis';
import { SearchResultUnit } from './Internal/SearchResult';
import { SerpPagination } from './Internal/Pagination';
import { SearchBar } from './Internal/SearchBar';

type SearchTaskProps = {
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  pageList: Serp[];
  task: TaskInfo;
  getTimeOnPage: () => number;
};

export const SearchResultPage: React.FC<SearchTaskProps> = (props) => {
  return (
    <>
      <MDBRow>
        <StyledSearchBarParent>
          <SearchBar query={props.task.query} />
        </StyledSearchBarParent>
      </MDBRow>
      <br />
      <MDBRow>
        <StyledDivider />
        <StyledRootContainer>
          {props.pageList.map((page, idx) => (
            <SearchResultUnit
              key={idx}
              page={page}
              task={props.task}
              rank={idx}
              offset={props.offset + 1}
              getTimeOnPage={props.getTimeOnPage}
            />
          ))}
          <div role="navigation">
            <span id="xjs">
              <SerpPagination
                task={props.task}
                offset={props.offset}
                setOffset={props.setOffset}
                getTimeOnPage={props.getTimeOnPage}
              />
            </span>
          </div>
        </StyledRootContainer>
      </MDBRow>
    </>
  );
};

const StyledSearchBarParent = styled.div`
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

const StyledRootContainer = styled.div`
  margin-left: 180px;
  padding-top: 20px;
`;
