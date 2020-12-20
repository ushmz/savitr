import React from 'react';
import styled from 'styled-components';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText,
  MDBCardTitle,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
} from 'mdbreact';

type Props = {
  title: string;
  url: string;
  snippet: string;
  cookies: string[];
  linkedPages: { title: string; url: string }[];
};

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

const URLText = styled.text`
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

const warningMessage = 'このページに訪れることで、以下のページが紐付けられます。';

type Page = {
  page?: {
    title: string;
    url: string;
  };
};

const LinkedText: React.FC<Page> = (page) => {
  if (page.page) {
    return (
      <a href={page.page.url} target="_blank" rel="noopener noreferrer">
        <LinkedPageText>{page.page.title}</LinkedPageText>
      </a>
    );
  } else {
    return <></>;
  }
};

/**
 * Return single search result component used in web search task.
 * Title of pages that collected when follow the link(passed as `Props.url`) are displayed.
 * @param {Props} param0 - Data make single search result(For detail, see type `Props`)
 * @returns {React.FC<Props>} - Single search result in search task.
 */

// Wrapping text https://mdbootstrap.com/docs/react/utilities/text/#text-wrapping-and-overflow

// TODO 固定幅にする or 上限値を設ける
export const PrivacyTaskSearchResult: React.FC<Props> = ({ title, snippet, url, cookies, linkedPages }) => {
  return (
    <SearchContainer>
      <MDBCard className="ml-3">
        <MDBCardHeader>
          {/* <MDBRow className="ml-1"> */}
          <a href={url} target="_blank" rel="noopener noreferrer">
            <URLText>{url}</URLText>
            <MDBCardTitle>
              <TitleText>{title}</TitleText>
            </MDBCardTitle>
          </a>
          <MDBCardText>{snippet}</MDBCardText>
          {/* </MDBRow> */}
        </MDBCardHeader>
        <MDBCardBody className="border border-dark m-3 rounded-lg">
          <MDBCardTitle>
            <WarningText>{warningMessage}</WarningText>
          </MDBCardTitle>
          {linkedPages.length < 3 ? (
            linkedPages.map((page) => {
              // eslint-disable-next-line react/jsx-key
              return <LinkedText page={page}></LinkedText>;
            })
          ) : (
            <>
              {/* ここを見やすくするか，LinkedTextを見やすくするか． */}
              <LinkedText page={linkedPages.shift()}></LinkedText>
              <LinkedText page={linkedPages.shift()}></LinkedText>
              <CollapseMenu items={linkedPages}></CollapseMenu>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </SearchContainer>
  );
};

// const LinkedPageList: React.FC<Array<{ title: string; url: string }>> = (pages) => {
//   switch (true) {
//     case 0 < pages.length && pages.length < 3:
//       // eslint-disable-next-line react/jsx-key
//       return pages.map((page) => <LinkedText page={page}></LinkedText>);
//     case 3 < pages.length:
//       return (
//         <>
//           <LinkedText page={pages.shift()}></LinkedText>
//           <LinkedText page={pages.shift()}></LinkedText>
//           <CollapseMenu items={pages}></CollapseMenu>
//         </>
//       );
//     default:
//       return <>紐付けられるページはありません．</>;
//   }
// };

type CollapseProps = {
  items: { title: string; url: string }[];
};

/**
 * Return Collapse menu component.
 * This component is too optimized for this search result,
 * so I don't separate this as (shared) component.
 * @param {CollapseProps} param0 - Listed string contents hidden in this Humburger menu.
 * @returns {React.FC<CollapseProps>} - Humburger menu component
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
              <LinkedPageText>{page.title}</LinkedPageText>
            </a>
          );
        })}
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
