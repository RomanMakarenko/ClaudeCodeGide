export type SearchKind = 'lesson' | 'artifact' | 'task';

export type SearchDocument = {
  id: string;
  kind: SearchKind;
  href: string;
  title: string;
  context: string;
  snippet: string;
  titleTokens: string[];
  contextTokens: string[];
};

export type SearchIndex = {
  version: 1;
  documents: SearchDocument[];
  postings: Record<string, number[]>;
};

export type SearchMatch = SearchDocument & {
  score: number;
};
