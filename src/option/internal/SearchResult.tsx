import React from 'react';
import styled from 'styled-components';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBCollapse, MDBIcon } from 'mdbreact';
import { WARNING_MESSAGE } from 'shared/consts';

const SearchContainer = styled.div`
  width: 720px;
  margin: auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TitleText = styled.p`
  color: #3132a9;
  font-weight: bold;
  font-size: 20px;
`;

const URLText = styled.p`
  color: #339d39;
  margin-bottom: 3px;
`;

const WarningText = styled.p`
  background: #ff9999;
  font-size: 20px;
`;

const LinkedPageText = styled.p`
  font-size: 18px;
`;

const truncateText = (text: string, len: number): string => {
  return text.length <= len ? text : text.substr(0, len) + '...';
};

type CollectedHistory = {
  title: string;
  url: string;
};

type CollectedHistories = {
  histories: CollectedHistory[];
};

const LinkedText: React.FC<CollectedHistory> = ({ title, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <LinkedPageText>{truncateText(title, 33)}</LinkedPageText>
    </a>
  );
};

const CollectedPages: React.FC<CollectedHistories> = ({ histories }) => {
  if (histories.length === 0) {
    return <>紐付けられる履歴情報はありません</>;
  } else if (histories.length < 3) {
    return (
      <>
        <WarningText>{WARNING_MESSAGE}</WarningText>
        {histories.map((history) => (
          // eslint-disable-next-line react/jsx-key
          <LinkedText title={history.title} url={history.url}></LinkedText>
        ))}
      </>
    );
  } else {
    const primary = histories.shift() || { title: '', url: '' };
    const secondly = histories.shift() || { title: '', url: '' };

    return (
      <>
        <WarningText>{WARNING_MESSAGE}</WarningText>
        <LinkedText title={primary.title} url={primary.url}></LinkedText>
        <LinkedText title={secondly.title} url={secondly.url}></LinkedText>
        <CollapseMenu items={histories}></CollapseMenu>
      </>
    );
  }
};

type Props = {
  title: string;
  url: string;
  snippet: string;
  linkedPages: { title: string; url: string }[];
};

/**
 * Return single search result component used in web search task.
 * Title of pages that collected when follow the link(passed as `Props.url`) are displayed.
 */
export const PrivacyTaskSearchResult: React.FC<Props> = ({ title, snippet, url, linkedPages }) => {
  return (
    <SearchContainer>
      <MDBCard className="ml-1">
        <MDBCardHeader>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <URLText>{truncateText(url, 72)}</URLText>
            <MDBCardTitle>
              <TitleText>{truncateText(title, 33)}</TitleText>
            </MDBCardTitle>
          </a>
          <MDBCardText>{truncateText(snippet, 125)}</MDBCardText>
        </MDBCardHeader>
        <MDBCardBody className="border border-dark m-3 rounded-lg">
          <CollectedPages histories={linkedPages}></CollectedPages>
        </MDBCardBody>
      </MDBCard>
    </SearchContainer>
  );
};

type CollapseProps = {
  items: { title: string; url: string }[];
};

/**
 * Return Collapse menu component.
 * This component is too optimized for this search result,
 * so I don't separate this as (shared) component.
 */
const CollapseMenu: React.FC<CollapseProps> = ({ items }) => {
  const [collapsedID, setCollapsedID] = React.useState<string>('');

  const toggleCollapse = (collapseID: string) => () => {
    setCollapsedID((prevState) => {
      return prevState !== collapseID ? collapseID : '';
    });
  };

  return (
    <>
      <MDBCollapse id={'hambgr'} isOpen={collapsedID}>
        {items.map((page) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <a href={page.url} target="_blank" rel="noopener noreferrer">
              <LinkedPageText>{truncateText(page.title, 33)}</LinkedPageText>
            </a>
          );
        })}
        {/* 余力and意味があれば */}
        {/* <MDBTypography tag="p">{`このページから検出されたサードパーティクッキー：${cookies.join(',')}`}</MDBTypography> */}
      </MDBCollapse>
      <MDBBtn className="mx-auto" color={'light-blue'} onClick={toggleCollapse('hambgr')}>
        <MDBIcon
          fixed
          icon="angle-down"
          className="mx-auto"
          onClick={toggleCollapse('hambgr')}
          flip={collapsedID === '' ? undefined : 'vertical'}
        />
        {collapsedID === '' ? `その他${items.length}件` : '非表示'}
      </MDBBtn>
    </>
  );
};
