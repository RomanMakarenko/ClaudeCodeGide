export type GuideLevel = {
  id: string;
  number: number;
  title: string;
  description: string;
  planned: number;
};

export type GuideCodeBlock = {
  language: string;
  code: string;
  caption?: string;
};

export type GuideLink = {
  label: string;
  href: string;
  kind: 'presentation' | 'video' | 'optional-resource';
};

export type GuideTable = {
  headers: string[];
  rows: string[][];
};

export type GuideLab = {
  id: string;
  title: string;
  goal: string;
  steps: string[];
  inputs?: string[];
  outputs?: string[];
  verification?: string[];
  stopCondition?: string;
  artifactIds?: string[];
  sourceRefs: string[];
};

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  code?: GuideCodeBlock[];
  table?: GuideTable;
  note?: string;
  artifactIds?: string[];
  additionalMaterials?: GuideLink[];
  lab?: GuideLab;
};

export type GuidePage = {
  id: string;
  slug: string;
  title: string;
  levelId: string;
  order: number;
  description: string;
  sourceUrl: string;
};
