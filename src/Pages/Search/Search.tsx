import { MDBCol, MDBRow, MDBIcon, MDBPagination, MDBPageItem, MDBPageNav, MDBBtn, MDBContainer } from 'mdbreact';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { createClickLog, Serp, TaskInfo } from '../../shared/apis/apis';
import { truncateText } from '../../shared/util';

import { SEARCH_SVG_PATH, CROSS_SVG_PATH } from '../../shared/consts';

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
      <link type="text/css" rel="stylesheet" href="css/googleish_footer.css" />
      <link type="text/css" rel="stylesheet" href="css/googleish_head_1.css" />
      <link type="text/css" rel="stylesheet" href="css/googleish_head_2.css" />
      <link type="text/css" rel="stylesheet" href="css/googleish_head_3.css" />
      <link type="text/css" rel="stylesheet" href="css/googleish_body_1.css" />
      <link type="text/css" rel="stylesheet" href="css/googleish_kp_extra.css" />
      <MDBRow className="mb-5">
        <SearchHeader query={props.task.query} />
      </MDBRow>
      <br />
      <MDBRow className="mt-5">
        <MDBCol md="1"></MDBCol>
        <MDBCol md="11">
          <SearchList {...props} />
        </MDBCol>
      </MDBRow>
    </>
  );
};

export const SearchList: React.FC<SearchTaskProps> = ({ offset, setOffset, pageList, task, getTimeOnPage }) => {
  const [popuped, togglePopup] = useState<boolean>(false);
  return (
    <div className="main" id="main">
      <div className="cnt">
        <div className="GyAeWb" id="rcnt">
          <div className="D6j0vc">
            <div className="center_col">
              <div className="eqAnXb" id="res" role="main">
                <div className="search">
                  <div>
                    <div id="rso">
                      {pageList.map((page, idx) => (
                        <SearchResult
                          key={idx}
                          page={page}
                          task={task}
                          rank={idx + 1}
                          offset={offset + 1}
                          getTimeOnPage={getTimeOnPage}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* 「他のキーワード」欄 */}
                <div className="buttonmads"></div>
                <div className="botstuff">
                  <div>
                    <div id="bres">
                      <div className="ULSxyf">
                        <div className="w3bYAd">
                          <div className="oIk2Cb">
                            <h3 className="O3JH7">
                              <span className="mfMhoc">{/*他のキーワード*/}</span>
                            </h3>
                            <div className="y6Uyqe">
                              <div className="EIaa9b">
                                {/* `AJLUJb` is column */}
                                <div className="AJLUJb">
                                  {/* <QueryCand> A query candidate component*/}
                                  <div>
                                    <a className="k8XOCe" href="#">
                                      <div className="aXBZVd"></div>
                                      <div className="s75CSd OhScic AB4Wff">
                                        <b>{/* Other query candidate */}</b>
                                      </div>
                                    </a>
                                  </div>
                                  {/* </QueryCand> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'none' }}></div>
                  </div>
                </div>
                <div style={{ display: 'none' }}></div>
                <div role="navigation">
                  <span id="xjs">
                    <h1 className="Uo8X3b OhScic zsYMMe">{/*ページの操作*/}</h1>
                    <SerpPagination offset={offset} setOffset={setOffset} />
                  </span>
                  <div id="gfn"></div>
                  <span id="fvf"></span>
                </div>
              </div>
            </div>
            <div style={{ clear: 'both' }}></div>
          </div>
          <CunningPanel task={task} togglePopup={() => togglePopup(!popuped)} />
          <ConfirmPopup answer={task.title} isOpen={popuped} toggle={() => togglePopup(!popuped)} linkTo="/search/6" />
        </div>
      </div>
    </div>
  );
};

type SearchHeaderProps = {
  query: string;
};

/**
 *
 */
export const SearchHeader: React.FC<SearchHeaderProps> = ({ query }) => {
  return (
    <div className="CvDJxb big" id="searchform" style={{ position: 'absolute', top: '20px' }}>
      <form className="tsf" action="/" id="tsf" method="GET" name="f" role="search">
        <div className="A8SBwf">
          <div className="RNNXgb">
            <div className="SDkEP">
              <div className="a4bIc">
                <div className="pR49Ae gsfi"></div>
                <div className="gLFyf uKLqed gsfi">
                  <div style={{ display: 'none' }} data-dismiss="" id="ow18">
                    <div className="CIKhFd v0rrvd">
                      <div className="EA3l1b">
                        <div className="Xb004">
                          <span className="awHmMb xy0YY ohEFXb">
                            <span className="gLWQQ">/</span> を押すと検索ボックスに移動できます
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  disabled
                  className="gLFyf gsfi"
                  name="q"
                  type="text"
                  aria-autocomplete="both"
                  aria-haspopup="false"
                  role="combobox"
                  value={query}
                  aria-label="検索"
                />
              </div>
              <div className="dRYYxd">
                <div className="BKRPef M2vV3" aria-label="消去" role="button">
                  <span className="ExCKkf z1asCe rzyADb" role="button" tabIndex={0} aria-label="消去">
                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d={CROSS_SVG_PATH}></path>
                    </svg>
                  </span>
                  <span className="ACRAdd"></span>
                </div>
              </div>
            </div>
            <button disabled className="Tg7LZd" aria-label="検索">
              <div className="FAuhyb">
                <span className="z1asCe MZy1Rb">
                  <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d={SEARCH_SVG_PATH}></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

type SearchResultProps = {
  page: Serp;
  task: TaskInfo;
  getTimeOnPage: () => number;
  rank: number;
  offset: number;
};

/**
 * Last of this component must be wrapped by <div> tag with `hlcw0c` className
 */
export const SearchResult: React.FC<SearchResultProps> = ({ page, task, rank, offset, getTimeOnPage }) => {
  const isShown = rank % 2 == 0 || Object.keys(page.leaks).length == 0;
  return (
    <div className="g">
      <div>
        <div className="tF2Cxc">
          {/* URL and page title component */}
          <div className="yuRUbf">
            <a
              href={page.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                createClickLog({
                  uid: localStorage.getItem('uid') || '',
                  taskId: task.id,
                  conditionId: task.conditionId,
                  time: getTimeOnPage(),
                  rank: rank,
                  page: offset,
                });
              }}
            >
              <br />
              <h3 className="LC20lb DKV0Md">{truncateText(page.title, 30)}</h3>
              <div className="TbwUpd NJjxre">
                <cite className="iUh30 Zu0yb qLRx3b tjvcx">
                  {truncateText(decodeURI(page.url), 72)}
                  <span className="dyjrff qzEoUe">{/* If there is some category or URL params */}</span>
                </cite>
              </div>
            </a>
          </div>
          <div className="IsZvec">
            <div className="VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc">
              <span className="MUxGbd wuQ4Ob WZ8Tjf">{/* Page createdAt or updatedAt */}</span>
              <span>{truncateText(page.snippet, 180)}</span>
            </div>
          </div>
          {/* 「他の人はこちらも検索」のやつ*/}
          {isShown && (
            <div id="eob_21">
              <div className="AUiS2" style={{ display: 'block', opacity: 1 }}>
                <div style={{ display: 'none' }}>
                  <div></div>
                </div>
                <div>
                  <div className="d8lLoc">
                    <h4 className="eJ7tvc">{'第3者に過去に訪問したことが知られてしまう可能性があるページ'}</h4>
                    <span
                      className="XCKyNd"
                      aria-label="第3者に過去に訪問したことが知られてしまう可能性があるページ"
                      role="button"
                      tabIndex={0}
                    ></span>
                    <div className="hYkSRb">
                      <div className="exp-c">
                        {Object.entries(page.leaks).map(([k, v]) => (
                          <img
                            key={k}
                            src={v.icon}
                            onError={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.display = 'none';
                              const leaksArea = document.getElementById('eob_21');
                              if (leaksArea != null) {
                                leaksArea.style.display = 'none';
                              }
                            }}
                            style={{ height: 30, objectFit: 'cover' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type PaginationProps = {
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

export const SerpPagination: React.FC<PaginationProps> = ({ offset, setOffset }) => {
  return (
    <div className="pt-3 pb-5">
      <MDBPagination color="blue">
        <MDBPageItem disabled={offset <= 0}>
          <MDBPageNav onClick={() => setOffset(offset - 1)}>
            <MDBIcon icon="angle-double-left" />
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 0}>
          <MDBPageNav onClick={() => setOffset(0)}>1</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 1}>
          <MDBPageNav onClick={() => setOffset(1)}>2</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 2}>
          <MDBPageNav onClick={() => setOffset(2)}>3</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 3}>
          <MDBPageNav onClick={() => setOffset(3)}>4</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 4}>
          <MDBPageNav onClick={() => setOffset(4)}>5</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 5}>
          <MDBPageNav onClick={() => setOffset(5)}>6</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 6}>
          <MDBPageNav onClick={() => setOffset(6)}>7</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 7}>
          <MDBPageNav onClick={() => setOffset(7)}>8</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 8}>
          <MDBPageNav onClick={() => setOffset(8)}>9</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem disabled={offset >= 8} onClick={() => setOffset(offset + 1)}>
          <MDBPageNav>
            <MDBIcon icon="angle-double-right" />
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
    </div>
  );
};

type CunningPanelProps = {
  togglePopup: () => void;
  task: TaskInfo;
};

export const CunningPanel: React.FC<CunningPanelProps> = ({ task, togglePopup }) => {
  return (
    <div className="TQc1id rhstc4" id="rhs" style={{ position: 'fixed' }}>
      <div className="liYKde g VjDLd">
        <div className="kp-wholepage kp-wholepage-osrp HSryR EyBRub">
          <div className="I6TXqe osrp-blk" id="_uUDQYPjzDPGEr7wPy9SaCA91">
            <div className="d7sCQ kp-header">
              <div className="fYOrjf kp-hc">
                <div className="Hhmu2e wDYxhc NFQFxe viOShc LKPcQc" style={{ clear: 'none' }}>
                  <div className="Ftghae iirjIb DaSCDf">
                    <div className="SPZz6b">
                      <h2 className="qrShPb kno-ecr-pt PZPZlf mfMhoc">
                        <span>{task.title}</span>
                      </h2>
                    </div>
                  </div>
                  <div className="wDYxhc" style={{ clear: 'none', paddingTop: 12 }}>
                    <div className="zloOqf kpS1Ac vk_gy">
                      <span className="YhemCb">{task.description}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="OOjqEf"></div>
            </div>
            <div>
              <div className="Kot7x">
                <div id="kp-wp-tab-cont-overview" className="SoydSe">
                  <div className="TzHB6b cLjAic LMRCfc">
                    <div className="sATSHe">
                      <div>
                        <div className="LuVEUc XleQBd B03h3d P6OZi V14nKc ptcLIOszQJu__wholepage-card wp-ms">
                          <div className="UDZeY OTFaAf">
                            <div>
                              <div className="wDYxhc">
                                <div className="PZPZlf hb8SAc">
                                  <div>
                                    <div className="kno-rdesc" style={{ paddingTop: 12 }}>
                                      <h3 style={{ fontSize: 24 }}>注意事項</h3>
                                      <span>・検索キーワードは変更できません。</span>
                                      <br />
                                      <span>・ブラウザの「戻る」ボタンは使用しないでください。</span>
                                      <br />
                                      <span>・検索結果は新規タブで開かれます。</span>
                                      <br />
                                      <span>・制限時間はありません。</span>
                                      <br />
                                      <span>・回答は以下のボタンを押して提出してください。</span>
                                      <br />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="TzHB6b cLjAic">
                    <div className="sATSHe">
                      <div>
                        <div className="LuVEUc B03h3d P6OZi V14nKc ptcLIOszQJu__wholepage-card wp-ms">
                          <div className="UDZeY OTFaAf">
                            <div className="wDYxhc ml-3">
                              <div className="XQvBOc ml-5">
                                <div className="ml-4">
                                  <span>
                                    <span>
                                      <MDBBtn type="button" color="blue" onClick={togglePopup}>
                                        {'タスク回答を提出'}
                                      </MDBBtn>
                                    </span>
                                  </span>
                                  <div className="xlrjNe"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GoogleIshFooter: React.FC = () => {
  return (
    <>
      <link type="text/css" rel="stylesheet" href="css/googleish_footer.css" />
      <div id="bfoot">
        <span style={{ display: 'none' }}>
          <span style={{ display: 'none' }}></span>
        </span>
      </div>
      <div className="spch s2fp-h" style={{ display: 'none' }} id="spch">
        <button className="close-button" id="spchx" aria-label="閉じる">
          ×
        </button>
        <div className="spchc" id="spchc">
          <div className="inner-container">
            <div className="button-container">
              <span className="r8s4j" id="spchl"></span>

              <span className="button" id="spchb">
                <div className="microphone">
                  <span className="receiver"></span>

                  <div className="wrapper">
                    <span className="stem"></span>
                    <span className="shell"></span>
                  </div>
                </div>
              </span>
            </div>
            <div className="text-container">
              <span className="spcht" style={{ color: '#9aa0a6' }} id="spchi"></span>

              <span className="spcht" style={{ color: '#bdc1c6' }} id="spchf"></span>
            </div>
            <div className="google-logo"></div>
          </div>
          <div className="permission-bar">
            <div className="permission-bar-gradient"></div>
          </div>
        </div>
      </div>
      <div role="contentinfo">
        <h1 className="Uo8X3b OhScic zsYMMe">フッターのリンク</h1>
        <div id="footcnt">
          <div className="TCIIWe" style={{ height: '106px' }} id="fbarcnt">
            <div className="f6F9Be TrMVnc mSAqxd" id="fbar">
              <div className="fbar b2hzT">
                <div className="b0KoTc B4GxFc">
                  <span className="Q8LRLc">日本</span>
                  <div className="fbar smiUbb" style={{ visibility: 'visible' }} id="swml">
                    <span className="yLngu unknown_loc" id="EcMbV"></span>
                    <span id="Wprf1b">中区、静岡県浜松市</span>
                    <span id="VdZal"> - </span>
                    <span id="gc9Iqb">インターネット アドレスに基づく</span>
                    <a id="BHDErf" style={{ display: 'none' }}></a>
                    <span id="K3p6wc" style={{}}>
                      {' '}
                      -{' '}
                    </span>
                    <a href="#" id="eqQYZc" style={{}}>
                      正確な現在地を使用
                    </a>
                    <span id="swml_lmsep">&nbsp;-&nbsp;</span>
                    <a href="#">詳細</a>
                  </div>
                </div>
              </div>
              <div className="fbar">
                <span className="B4GxFc">
                  <span id="fsl">
                    <a className="JWaTvb Fx4vi" href="#">
                      ヘルプ
                    </a>
                    <a href="#" className="Fx4vi" id="dk2qOd" target="_blank">
                      フィードバックを送信
                    </a>
                    <a className="JWaTvb Fx4vi" href="#">
                      プライバシー
                    </a>
                    <a className="JWaTvb Fx4vi" href="#">
                      規約
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type ConfirmPopupProps = {
  answer: string;
  isOpen: boolean;
  toggle: () => void;
  linkTo: string;
};

import Modal from 'react-modal';

// TODO: Send answers to log server
export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ answer, isOpen, toggle, linkTo }) => {
  const [name, setName] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  Modal.setAppElement('#main');
  const modalStyle = {
    overlay: {
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
    content: {
      width: '480px',
      height: '400px',
      margin: 'auto',
      borderRadius: '1rem',
      padding: '1.5rem',
    },
  };

  return (
    <MDBContainer>
      <Modal isOpen={isOpen} style={modalStyle} onRequestClose={() => toggle()}>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="productName">
              {answer}
            </label>
            <input
              type="text"
              id="productName"
              value={name}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="reason">
              理由
            </label>
            <textarea
              className="form-control"
              id="reason"
              value={reason}
              rows={4}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
        </form>
        <MDBBtn color="secondary" className="float-left" onClick={toggle}>
          キャンセル
        </MDBBtn>
        <Link to={linkTo}>
          <MDBBtn
            disabled={name === '' || reason === ''}
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.className += ' was-validated';

              toggle();
            }}
          >
            検索タスクを終了する
          </MDBBtn>
        </Link>
      </Modal>
    </MDBContainer>
  );
};
