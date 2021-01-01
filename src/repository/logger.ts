const DESTINATION = 'https://in.destination.com/';

type BehaviorLog = {
  id: string;
  uid: string;
  timeOnPage: number;
  // 閲覧した最大深度どう取るか・
  positionOnPage: number;
};

type ClickLog = {
  id: string;
  uid: string;
  timeOnPage: number;
  pageUrl: string;
  linkedPageNum: number;
};

export const sendBehaviorLog (behaviorLog: BehaviorLog) => {};

export const sendClickLog (clickLog: ClickLog) => {};
