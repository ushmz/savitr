import React from 'react';
import { MDBBtn, MDBCollapse, MDBContainer, MDBIcon, MDBTypography } from 'mdbreact';
import { WarningText, URLText, TitleText } from './AdjustedComponents';
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
    return <div className="m-3">紐付けられる履歴情報はありません</div>;
  } else if (histories.length < 3) {
    return (
      <div className="m-3">
        <WarningText>{WARNING_MESSAGE}</WarningText>
        {histories.map((history, idx) => (
          <HREFText
            key={idx}
            title={history.title}
            url={history.url}
            onClick={() =>
              sendHistoryClickLog({
                uid: chrome.runtime.id,
                linkedDocumentUrl: documentURL,
                linkedPageNum: histories.length,
              })
            }
          />
        ))}
      </div>
    );
  } else {
    // DO NOT use `.shift()`
    const primary = histories[0];
    const secondly = histories[1];

    return (
      <div className="m-3">
        <WarningText>{WARNING_MESSAGE}</WarningText>
        <HREFText
          title={primary.title}
          url={primary.url}
          onClick={() =>
            sendHistoryClickLog({
              uid: chrome.runtime.id,
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
              uid: chrome.runtime.id,
              linkedDocumentUrl: documentURL,
              linkedPageNum: histories.length,
            })
          }
        />
        <CollapseMenu items={histories.slice(2)} documentURL={documentURL} />
      </div>
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
    <MDBContainer className="py-3">
      {/* <MDBCard className="ml-1"> */}
      {/* <MDBCardHeader> */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          sendDocumentClickLog({
            uid: chrome.runtime.id,
            pageUrl: url,
            linkedPageNum: linkedPages.length,
          });
        }}
      >
        <URLText>{truncateText(url, 72)}</URLText>
        <TitleText>{truncateText(title, 33)}</TitleText>
      </a>
      <MDBTypography tag="p">{truncateText(snippet, 125)}</MDBTypography>
      {/* </MDBCardHeader> */}
      <div className="border border-dark m-3 rounded-lg">
        <CollectedPages histories={linkedPages} documentURL={url} />
      </div>
      {/* </MDBCard> */}
    </MDBContainer>
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
        {items.map((page, idx) => {
          return (
            <HREFText
              key={idx}
              title={page.title}
              url={page.url}
              onClick={() =>
                sendHistoryClickLog({
                  uid: chrome.runtime.id,
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
