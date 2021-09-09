export type TaskInfo = {
  id: number;
  query: string;
  title: string;
  description: string;
  searchUrl: string;
};

export type SerpType = 'icon' | 'pct';

export type SimilarwebPage = {
  id: string;
  title: string;
  url: string;
  icon: string;
  category?: number;
};

export type SimilarwebDistribution = {
  category: string;
  count: number;
  pct: number;
};

export type SerpSimple = {
  id: string;
  title: string;
  url: string;
  snippet: string;
};

export type Serp = SerpSimple & {
  leaks?: SimilarwebPage[];
  total?: number;
  distribution?: SimilarwebDistribution[];
};

export type SerpWithIcon = SerpSimple & {
  leaks: SimilarwebPage[];
};

export type SerpWithDistribution = SerpSimple & {
  total: number;
  distribution: SimilarwebDistribution[];
};
