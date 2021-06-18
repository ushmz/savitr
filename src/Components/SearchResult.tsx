import React from 'react';
// import { MDBBtn, MDBCollapse, MDBIcon, MDBPopper } from 'mdbreact';
import { URLText, TitleText, SearchResultContainer, SizedText, WarningText } from './AdjustedComponents';
import { truncateText } from '../shared/util';
import { sendDocumentClickLog, sendHistoryClickLog } from '../repository/logAPI';
// import { WARNING_MESSAGE } from '../shared/consts';
import { LeakedPage } from '../shared/apis/apis';

type Props = {
  title: string;
  url: string;
  snippet: string;
  leakedPages: LeakedPage[];
  getTimeOnPage: () => number;
  taskName: string;
  visible: boolean;
};

/**
 * Return single search result component used in web search task.
 */
export const SearchResult: React.FC<Props> = ({
  title,
  snippet,
  url,
  leakedPages,
  getTimeOnPage,
  taskName,
  visible,
}) => {
  return (
    <SearchResultContainer className="pl-3 py-3" style={{ width: '720px' }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          sendDocumentClickLog({
            uid: localStorage.getItem('uid') || '',
            taskName: taskName,
            timeOnPage: getTimeOnPage(),
            pageUrl: url,
            linkedPageNum: leakedPages.length,
          });
        }}
      >
        <URLText size="14px">{truncateText(url, 72)}</URLText>
        <TitleText size="18px">{truncateText(title, 33)}</TitleText>
      </a>
      <SizedText size="14px">{truncateText(snippet || '', 200)}</SizedText>
      {leakedPages.length === 0 ? (
        <></>
      ) : (
        visible && (
          <>
            {/* <WarningText size="18px">{WARNING_MESSAGE}</WarningText> */}
            <div className="m-3">
              {/* <CollectedPages histories={leakedPages} documentURL={url} getTimeOnPage={getTimeOnPage} taskName={taskName} /> */}
              <CollectedTendencyIconList
                histories={leakedPages}
                documentURL={url}
                getTimeOnPage={getTimeOnPage}
                taskName={taskName}
              ></CollectedTendencyIconList>
            </div>
          </>
        )
      )}
    </SearchResultContainer>
  );
};

type CollectedTendencyIconListProps = {
  histories: LeakedPage[];
  documentURL: string;
  getTimeOnPage: () => number;
  taskName: string;
};

const CollectedTendencyIconList: React.FC<CollectedTendencyIconListProps> = (props) => {
  const icons = props.histories.map((history) => {
    return (
      <img
        key={history.id}
        src={history.icon}
        // @ts-ignore
        onError={(e) => (e.target.style.display = 'none')}
        style={{ height: 30, objectFit: 'cover' }}
      />
    );
  });

  return <>{icons.slice(0, 5)}</>;
};

// type CollectedPagesProp = {
//   histories: LeakedPage[];
//   documentURL: string;
//   getTimeOnPage: () => number;
//   taskName: string;
// };

// const CollectedPages: React.FC<CollectedPagesProp> = ({ histories, documentURL, getTimeOnPage, taskName }) => {
//   if (histories.length === 0) {
//     return <></>;
//   } else if (histories.length < 3) {
//     return (
//       <div className="m-3">
//         <WarningText size="18px">{WARNING_MESSAGE}</WarningText>
//         {histories.map((history, idx) => (
//           <div
//             key={idx}
//             onClick={() =>
//               sendHistoryClickLog({
//                 uid: localStorage.getItem('uid') || '',
//                 taskName: taskName,
//                 timeOnPage: getTimeOnPage(),
//                 linkedDocumentUrl: documentURL,
//                 linkedPageNum: histories.length,
//                 collapse: false,
//               })
//             }
//           >
//             <MDBPopper domElement placement="top">
//               <a href={history.url} target="_blank" rel="noopener noreferrer">
//                 <TextTruncate line={1} element="p" truncateText="..." text={history.title} />
//               </a>
//               <span>
//                 <img src={history.thumb} width="240px" />
//               </span>
//             </MDBPopper>
//           </div>
//         ))}
//       </div>
//     );
//   } else {
//     const primary = histories[0];
//     const secondly = histories[1];
//
//     return (
//       <div className="m-3">
//         <WarningText size="18px">{WARNING_MESSAGE}</WarningText>
//         <div
//           onClick={() =>
//             sendHistoryClickLog({
//               uid: chrome.runtime.id,
//               taskName: taskName,
//               timeOnPage: getTimeOnPage(),
//               linkedDocumentUrl: documentURL,
//               linkedPageNum: histories.length,
//               collapse: false,
//             })
//           }
//         >
//           <MDBPopper domElement placement="top">
//             <a href={primary.url} target="_blank" rel="noopener noreferrer">
//               <TextTruncate line={1} element="p" truncateText="..." text={primary.title} />
//             </a>
//             <span>
//               <img src={primary.thumb} width="240px" />
//             </span>
//           </MDBPopper>
//         </div>
//
//         <div
//           onClick={() =>
//             sendHistoryClickLog({
//               uid: chrome.runtime.id,
//               taskName: taskName,
//               timeOnPage: getTimeOnPage(),
//               linkedDocumentUrl: documentURL,
//               linkedPageNum: histories.length,
//               collapse: false,
//             })
//           }
//         >
//           <MDBPopper domElement placement="top">
//             <a href={secondly.url} target="_blank" rel="noopener noreferrer">
//               <TextTruncate line={1} element="p" truncateText="..." text={secondly.title} />
//             </a>
//             <span>
//               <img src={secondly.thumb} width="240px" />
//             </span>
//           </MDBPopper>
//         </div>
//         <CollapseMenu
//           items={histories.slice(2)}
//           documentURL={documentURL}
//           getTimeOnPage={getTimeOnPage}
//           taskName={taskName}
//         />
//       </div>
//     );
//   }
// };

type CollapseMenuProps = {
  items: LeakedPage[];
  documentURL: string;
  getTimeOnPage: () => number;
  taskName: string;
};

/**
 * Return Collapse menu component.
 * This is for the risk display area.
 */
// const CollapseMenu: React.FC<CollapseMenuProps> = ({ items, documentURL, getTimeOnPage, taskName }) => {
//   const [collapsedID, setCollapsedID] = React.useState<string>('');
//
//   const toggleCollapse = (collapseID: string) => () => {
//     sendHistoryClickLog({
//       uid: localStorage.getItem('uid') || '',
//       taskName: taskName,
//       timeOnPage: getTimeOnPage(),
//       linkedDocumentUrl: documentURL,
//       linkedPageNum: items.length + 2,
//       collapse: true,
//     });
//     setCollapsedID((prevState) => {
//       return prevState !== collapseID ? collapseID : '';
//     });
//   };
//
//   return (
//     <>
//       <MDBCollapse id={'hambgr'} isOpen={collapsedID}>
//         {items.map((page, idx) => {
//           return (
//             <div
//               key={idx}
//               onClick={() =>
//                 sendHistoryClickLog({
//                   uid: localStorage.getItem('uid') || '',
//                   taskName: taskName,
//                   timeOnPage: getTimeOnPage(),
//                   linkedDocumentUrl: documentURL,
//                   linkedPageNum: items.length + 2,
//                   collapse: false,
//                 })
//               }
//             >
//               <MDBPopper domElement placement="top">
//                 <a href={page.url} target="_blank" rel="noopener noreferrer">
//                   <TextTruncate line={1} element="p" truncateText="..." text={page.title} />
//                 </a>
//                 <span>
//                   <img src={page.icon} width="240px" />
//                 </span>
//               </MDBPopper>
//             </div>
//           );
//         })}
//       </MDBCollapse>
//       <MDBBtn className="mx-auto" color={'light-blue'} onClick={toggleCollapse('hambgr')}>
//         <MDBIcon
//           fixed
//           icon="angle-down"
//           className="mx-auto"
//           onClick={toggleCollapse('hambgr')}
//           flip={collapsedID === '' ? undefined : 'vertical'}
//         />
//         {collapsedID === '' ? `その他${items.length}件` : '非表示'}
//       </MDBBtn>
//     </>
//   );
// };
