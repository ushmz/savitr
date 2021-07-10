import React from 'react';
import { MDBBtn } from 'mdbreact';
import { TaskInfo } from '../../../../shared/apis/apis';

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
