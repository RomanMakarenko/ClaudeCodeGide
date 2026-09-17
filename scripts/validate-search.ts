import { artifacts } from '../src/data/artifacts';
import { guidePages } from '../src/data/guide';
import { taskSpecs } from '../src/data/task-specs';
import { searchIndex } from '../src/data/search';
import { search } from '../src/lib/search';

const errors: string[] = [];
const expectedCount = guidePages.length + artifacts.length + taskSpecs.length;
const ids = new Set<string>();
const hrefs = new Set<string>();

if (searchIndex.documents.length !== expectedCount) errors.push(`Search index count mismatch: ${searchIndex.documents.length} !== ${expectedCount}`);
for (const [documentId, document] of searchIndex.documents.entries()) {
  if (ids.has(document.id)) errors.push(`Duplicate search document id: ${document.id}`);
  if (hrefs.has(document.href)) errors.push(`Duplicate search document href: ${document.href}`);
  ids.add(document.id);
  hrefs.add(document.href);
  if (!document.title.trim() || !document.context.trim() || !document.snippet.trim()) errors.push(`Incomplete search document: ${document.id}`);
  if (document.snippet.length > 220) errors.push(`Search snippet too long: ${document.id}`);
  if (document.href.startsWith('/dist') || document.href.includes('.astro') || document.href.includes('node_modules')) errors.push(`Generated search href: ${document.href}`);
  if ('template' in document || 'artifactExamples' in document || 'paragraphs' in document || 'fields' in document) errors.push(`Raw registry payload in search document: ${document.id}`);
  for (const token of [...document.titleTokens, ...document.contextTokens]) {
    if (!searchIndex.postings[token]?.includes(documentId)) errors.push(`Missing posting: ${token} -> ${document.id}`);
  }
}

for (const [token, documentIds] of Object.entries(searchIndex.postings)) {
  if (!token.trim() || !documentIds.length) errors.push(`Empty search posting: ${token}`);
  const sorted = [...documentIds].sort((a, b) => a - b);
  if (sorted.some((value, index) => value !== documentIds[index])) errors.push(`Unsorted search posting: ${token}`);
  if (new Set(documentIds).size !== documentIds.length) errors.push(`Duplicate search posting: ${token}`);
  for (const documentId of documentIds) if (!searchIndex.documents[documentId]) errors.push(`Unknown posting document: ${token} -> ${documentId}`);
}

const evidenceMatches = search(searchIndex, 'евіденс');
if (evidenceMatches[0]?.id !== 'evidence' || evidenceMatches[0]?.title !== 'EVIDENCE.md') errors.push('The «евіденс» query must rank EVIDENCE.md first');
if (!search(searchIndex, 'EVIDENCE').some((match) => match.id === 'evidence')) errors.push('The EVIDENCE query must find the evidence artifact');
if (!search(searchIndex, 'rollback').length) errors.push('The rollback keyword must return results');
if (search(searchIndex, '   ').length) errors.push('Whitespace-only query must return no results');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Search validation passed: ${searchIndex.documents.length} documents and ${Object.keys(searchIndex.postings).length} indexed terms.`);
