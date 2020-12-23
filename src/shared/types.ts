export type Pages = 'Attention' | 'Introduntion' | 'PreTask' | 'Task' | 'PostTask';

export interface RuntimeRequest<T> {
  method: string;
  query: T;
}

export interface HistoryQuery {
  max: number;
}

export interface ChromeHistoryResponse {
  id: string;
  lastVisitTime: number;
  title: string;
  typedCount: number;
  url: string;
  visitCount: number;
}

export type PageIDBTable = {
  id: string;
  title: string;
  start_uri: string;
  final_uri: string;
  recieved_uri: string[];
  requested_uri: string[];
};

export type CookieIDBTable = {
  domain: string[];
  httponly: string;
  secure: string;
};

export type JunctionIDBTable = {
  page_id: string;
  cookie_id: string;
};

// TODO: Better name
export interface CookieInformationStatus {
  status: boolean;
  cookies: string[];
  error: string;
  message: string;
}

export interface RuntimeMessageResponse<T> {
  data: Array<T>;
  status: boolean;
  message?: string;
}

export type HistoryAPIParams = {
  text: string;
  maxResults?: number;
  startTime?: number;
  endTime?: number;
};

export type SERPElement = {
  title: string;
  url: string;
  snippet: string;
  cookies: string[];
  linkedPages: { title: string; url: string }[];
};

export type SetPageProp = {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};
