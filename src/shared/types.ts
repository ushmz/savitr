export type TaskInfo = {
  id: number;
  query: string;
  title: string;
  description: string;
  searchUrl: string;
};

export type SerpType = 'icon' | 'ratio';

export type LinkedPage = {
  id: string;
  title: string;
  url: string;
  icon: string;
  category?: number;
};

export type LinkedPageDistribution = {
  category: string;
  count: number;
  // ratio: number;
};

export type SerpSimple = {
  id: string;
  title: string;
  url: string;
  snippet: string;
};

export type Serp = SerpSimple & {
  linked?: LinkedPage[];
  total?: number;
  distribution?: LinkedPageDistribution[];
};

export type SerpWithIcon = SerpSimple & {
  links: LinkedPage[];
};

export type SerpWithDistribution = SerpSimple & {
  total: number;
  distribution: LinkedPageDistribution[];
};
