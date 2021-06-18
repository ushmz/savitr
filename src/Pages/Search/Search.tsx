import React from 'react';
import { Serp } from '../../shared/apis/apis';

type ExpTaskProp = {
  pageList: Serp[];
};
export const ExpTask: React.FC<ExpTaskProp> = ({ pageList }) => {
  return (
    <>
      <link type="text/css" rel="stylesheet" href="css/googleish_head_1.css" />
      <link type="text/css" rel="stylesheet" href="css/googleish_head_2.css" />
      <link
        type="text/css"
        rel="stylesheet"
        href="https://www.gstatic.com/og/_/ss/k=og.qtm.P8n2dCwhoA8.L.W.O/m=qdid,qcwid/excm=qaaw,qadd,qaid,qein,qhaw,qhbr,qhch,qhga,qhid,qhin,qhpr/d=1/ed=1/ct=zgms/rs=AA2YrTvJt5zPrsxf72ExnOF2ZFpD5Kgx7A"
      />
      <link type="text/css" rel="stylesheet" href="css/googleish_body_1.css" />
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
                          <SearchResult key={idx} {...page} />
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
                      <table
                        className="AaVjTc"
                        style={{ borderCollapse: 'collapse', textAlign: 'left', margin: '30px auto 30px' }}
                      >
                        <tbody>
                          <tr>
                            {/* Current page: `YyVfkd` Both side: `d6cvqb`*/}
                            <td className="d6cvqb">{'<'}</td>
                            <td className="YyVfkd">{'1'}</td>
                            <td>
                              {/* `a` tag or `onClick` */}
                              <a aria-label="Page 2" className="fl" href="#">
                                {2}
                              </a>
                            </td>
                            <td>
                              <a aria-label="Page 3" className="fl" href="#">
                                {3}
                              </a>
                            </td>
                            <td>
                              <a aria-label="Page 4" className="fl" href="#">
                                {4}
                              </a>
                            </td>
                            <td aria-label="3" className="d6cvqb" role="heading">
                              {'>'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </span>
                    <div id="gfn"></div>
                    <span id="fvf"></span>
                  </div>
                </div>
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Last of this component must be wrapped by <div> tag with `hlcw0c` className
 */
export const SearchResult: React.FC<Serp> = (page) => {
  const isShown = parseInt(page.id) % 2 == 0 || Object.keys(page.leaks).length == 0;
  return (
    <div className="g">
      <div>
        <div className="tF2Cxc" style={{ height: '248px', transition: 'height 300ms ease-in-out 0s' }}>
          {/* URL and page title component */}
          <div className="yuRUbf">
            <a href={page.url}>
              <br />
              <h3 className="LC20lb DKV0Md">{page.title}</h3>
              <div className="TbwUpd NJjxre">
                <cite className="iUh30 Zu0yb qLRx3b tjvcx">
                  {page.url}
                  <span className="dyjrff qzEoUe">{/* If there is some category or URL params */}</span>
                </cite>
              </div>
            </a>
          </div>
          <div className="IsZvec">
            <div className="VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc">
              <span className="MUxGbd wuQ4Ob WZ8Tjf">{/* Page createdAt or updatedAt */}</span>
              <span>{page.snippet}</span>
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
                    <h4 className="eJ7tvc">{'このようなページが知られます'}</h4>
                    <span
                      className="XCKyNd"
                      aria-label="このようなページが知られます"
                      role="button"
                      tabIndex={0}
                    ></span>
                    <div className="hYkSRb">
                      <div className="exp-c">
                        {Object.entries(page.leaks).map(([_, v]) => (
                          <img
                            key={v.id}
                            src={v.icon}
                            // @ts-ignore
                            onError={(e) => (e.target.style.display = 'none')}
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
