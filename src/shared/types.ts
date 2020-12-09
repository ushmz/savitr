export type RuntimeRequest<T> = {
  method: string;
  query: T;
};

export type HistoryQuery = {
  max: number;
};

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
export type CookieInformationStatus = {
  status: boolean;
  cookies: string[];
  error: string;
  message: string;
};

export type ChromeRuntimeResponse = {
  data: Array<object>;
  status: boolean;
  message?: string;
};
