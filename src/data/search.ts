import { artifacts } from './artifacts';
import { guideContentByLevel } from './content';
import { guideLevels, guidePages } from './guide';
import { taskSpecs } from './task-specs';
import { normalizeText, tokenize } from '../lib/search';
import type { GuideSection } from '../types/guide';
import type { SearchDocument, SearchIndex } from '../types/search';

const MAX_SNIPPET_LENGTH = 220;

const shorten = (value: string) => {
  const clean = value.replace(/\s+/g, ' ').trim();
  return clean.length > MAX_SNIPPET_LENGTH ? `${clean.slice(0, MAX_SNIPPET_LENGTH - 1).trimEnd()}…` : clean;
};

const sectionText = (section: GuideSection) => [
  section.heading,
  ...(section.paragraphs ?? []),
  ...(section.bullets ?? []),
  ...(section.steps ?? []),
  ...(section.code?.map((block) => `${block.caption ?? ''} ${block.code}`) ?? []),
  ...(section.table?.headers ?? []),
  ...(section.table?.rows.flat() ?? []),
  section.note ?? '',
  section.lab?.title ?? '',
  section.lab?.goal ?? '',
  ...(section.lab?.steps ?? []),
  ...(section.lab?.inputs ?? []),
  ...(section.lab?.outputs ?? []),
  ...(section.lab?.verification ?? []),
  section.lab?.stopCondition ?? '',
  ...(section.artifactIds ?? [])
].filter(Boolean).join(' ');

const guideLevelById = new Map(guideLevels.map((level) => [level.id, level]));
const guideSectionsByPage = new Map<string, GuideSection[]>();
for (const content of Object.values(guideContentByLevel)) {
  for (const [pageId, sections] of Object.entries(content)) guideSectionsByPage.set(pageId, sections);
}

const documentParts = (document: SearchDocument) => `${document.title} ${document.context} ${document.snippet}`;
const documents: SearchDocument[] = [];

for (const page of guidePages) {
  const level = guideLevelById.get(page.levelId);
  const sections = guideSectionsByPage.get(page.id) ?? [];
  const body = sections.map(sectionText).join(' ');
  const context = `Рівень ${level?.number ?? ''}: ${level?.title ?? page.levelId}`;
  const titleTokens = tokenize(page.title);
  const contextTokens = tokenize(context);
  documents.push({
    id: page.id,
    kind: 'lesson',
    href: `/guide/${page.slug}`,
    title: page.title,
    context,
    snippet: shorten(page.description),
    titleTokens,
    contextTokens: [...new Set([...contextTokens, ...tokenize(body)])]
  });
}

for (const artifact of artifacts) {
  const aliases = artifact.aliases ?? [];
  const searchable = [
    artifact.name,
    artifact.id,
    artifact.category,
    artifact.responsibility,
    artifact.role,
    artifact.whenToUse,
    artifact.poorChoiceWhen,
    ...aliases,
    ...artifact.fields.map((field) => `${field.name} ${field.description}`),
    ...artifact.sourceRefs
  ].join(' ');
  documents.push({
    id: artifact.id,
    kind: 'artifact',
    href: `/artifacts#${artifact.id}`,
    title: artifact.name,
    context: artifact.category,
    snippet: shorten(`${artifact.responsibility} ${artifact.role}`),
    titleTokens: tokenize(`${artifact.name} ${artifact.id} ${aliases.join(' ')}`),
    contextTokens: [...new Set(tokenize(`${artifact.category} ${searchable}`))]
  });
}

for (const task of taskSpecs) {
  const searchable = [task.title, task.id, task.type, task.family, task.mode, task.goal, ...task.scope, ...task.nonGoals, ...task.success, ...task.rules, ...task.artifactIds, ...task.sourceLessonIds].join(' ');
  documents.push({
    id: task.id,
    kind: 'task',
    href: `/tasks#${task.id}`,
    title: task.title,
    context: `${task.family} · ${task.mode}`,
    snippet: shorten(task.goal),
    titleTokens: tokenize(`${task.title} ${task.id} ${task.type}`),
    contextTokens: [...new Set(tokenize(searchable))]
  });
}

const postings: Record<string, number[]> = {};
for (const [documentId, document] of documents.entries()) {
  const terms = new Set([...document.titleTokens, ...document.contextTokens, ...tokenize(documentParts(document))]);
  for (const term of terms) (postings[normalizeText(term)] ??= []).push(documentId);
}
for (const ids of Object.values(postings)) ids.sort((a, b) => a - b);

export const searchIndex: SearchIndex = { version: 1, documents, postings };
