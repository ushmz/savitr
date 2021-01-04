import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBCollapse, MDBIcon } from 'mdbreact';
import { WarningText, SearchContainer, URLText, TitleText } from './AdjustedComponents';
import { HREFText } from './HREFText';
import { truncateText } from '../../shared/util';
import { sendDocumentClickLog, sendHistoryClickLog } from '../../repository/logger';
import { WARNING_MESSAGE } from '../../shared/consts';

type CollectedHistory = {
  title: string;
  url: string;
};

type CollectedHistories = {
  histories: CollectedHistory[];
  documentURL: string;
};

const CollectedPages: React.FC<CollectedHistories> = ({ histories, documentURL }) => {
  if (histories.length === 0) {
    return <>紐付けられる履歴情報はありません</>;
  } else if (histories.length < 3) {
    return (
      <>
        <WarningText>{WARNING_MESSAGE}</WarningText>
        {histories.map((history) => (
          // eslint-disable-next-line react/jsx-key
          <HREFText
            title={history.title}
            url={history.url}
            onClick={() =>
              sendHistoryClickLog({
                id: chrome.runtime.id,
                linkedDocumentUrl: documentURL,
                linkedPageNum: histories.length,
              })
            }
          />
        ))}
      </>
    );
  } else {
    // DO NOT use `.shift()`
    const primary = histories[0];
    const secondly = histories[1];

    return (
      <>
        <WarningText>{WARNING_MESSAGE}</WarningText>
        <HREFText
          title={primary.title}
          url={primary.url}
          onClick={() =>
            sendHistoryClickLog({
              id: chrome.runtime.id,
              linkedDocumentUrl: documentURL,
              linkedPageNum: histories.length,
            })
          }
        />
        <HREFText
          title={secondly.title}
          url={secondly.url}
          onClick={() =>
            sendHistoryClickLog({
              id: chrome.runtime.id,
              linkedDocumentUrl: documentURL,
              linkedPageNum: histories.length,
            })
          }
        />
        <CollapseMenu items={histories.slice(2)} documentURL={documentURL} />
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
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              sendDocumentClickLog({
                id: chrome.runtime.id,
                pageUrl: url,
                linkedPageNum: linkedPages.length,
              });
            }}
          >
            <URLText>{truncateText(url, 72)}</URLText>
            <MDBCardTitle>
              <TitleText>{truncateText(title, 33)}</TitleText>
            </MDBCardTitle>
          </a>
          <MDBCardText>{truncateText(snippet, 125)}</MDBCardText>
        </MDBCardHeader>
        <MDBCardBody className="border border-dark m-3 rounded-lg">
          <CollectedPages histories={linkedPages} documentURL={url}></CollectedPages>
        </MDBCardBody>
      </MDBCard>
    </SearchContainer>
  );
};

type CollapseProps = {
  items: { title: string; url: string }[];
  documentURL: string;
};

/**
 * Return Collapse menu component.
 * This component is too optimized for this search result,
 * so I don't separate this as (shared) component.
 */
const CollapseMenu: React.FC<CollapseProps> = ({ items, documentURL }) => {
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
            <HREFText
              title={page.title}
              url={page.url}
              onClick={() =>
                sendHistoryClickLog({
                  id: chrome.runtime.id,
                  linkedDocumentUrl: documentURL,
                  linkedPageNum: items.length + 2,
                })
              }
            />
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
