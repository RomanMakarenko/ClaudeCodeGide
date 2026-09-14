import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { guideLevels, guidePages } from '../src/data/guide';
import { guideContentByLevel } from '../src/data/content';

const slugs = new Set<string>();
const ids = new Set<string>();
const errors: string[] = [];
const pagesById = new Map(guidePages.map((page) => [page.id, page]));

for (const page of guidePages) {
  if (ids.has(page.id)) errors.push(`Duplicate page id: ${page.id}`);
  if (slugs.has(page.slug)) errors.push(`Duplicate page slug: ${page.slug}`);
  ids.add(page.id);
  slugs.add(page.slug);
  if (!/^https:\/\//.test(page.sourceUrl ?? '')) errors.push(`Invalid source URL: ${page.id}`);
  if (!guideLevels.some((level) => level.id === page.levelId)) errors.push(`Unknown level: ${page.levelId}`);
  if (!existsSync(resolve(process.cwd(), page.sourceFile))) errors.push(`Missing source file: ${page.sourceFile}`);
}

for (const level of guideLevels) {
  const pages = guidePages.filter((page) => page.levelId === level.id);
  const orders = pages.map((page) => page.order);
  const expectedOrders = pages.map((_, index) => index + 1);
  if (new Set(orders).size !== orders.length) errors.push(`Duplicate order in ${level.id}`);
  if (orders.some((order, index) => order !== expectedOrders[index])) errors.push(`Non-contiguous order in ${level.id}`);
  if (level.planned > 0 && pages.length > level.planned) errors.push(`More pages than planned in ${level.id}`);
}

for (const [levelId, content] of Object.entries(guideContentByLevel)) {
  for (const [pageId, sections] of Object.entries(content)) {
    const page = pagesById.get(pageId);
    if (!page) {
      errors.push(`Orphan authored content: ${pageId}`);
      continue;
    }
    if (page.levelId !== levelId) errors.push(`Content level mismatch: ${pageId}`);
    if (!sections.length) errors.push(`Empty authored content: ${pageId}`);
    if (sections.some((section) => !section.heading.trim())) errors.push(`Empty section heading: ${pageId}`);
  }
}

for (const levelId of ['level-01', 'level-02', 'level-03', 'level-04', 'level-05', 'level-06', 'level-07', 'level-08', 'level-09', 'level-10', 'level-11', 'level-12', 'level-13', 'level-14', 'level-15', 'level-16', 'level-17', 'level-18', 'level-19', 'level-20', 'level-21', 'level-22', 'level-23', 'level-24', 'level-25']) {
  const pages = guidePages.filter((page) => page.levelId === levelId);
  const content = guideContentByLevel[levelId as keyof typeof guideContentByLevel];
  for (const page of pages) {
    if (!content?.[page.id]?.length) errors.push(`Missing authored content: ${page.id}`);
  }
}

if (pagesById.has('l1-06')) errors.push('JavaRush Plugin route must not be registered: l1-06');
if (Object.values(guideContentByLevel).some((content) => 'l1-06' in content)) {
  errors.push('JavaRush Plugin content must not be present: l1-06');
}
const readme = readFileSync(resolve(process.cwd(), 'README.md'), 'utf8');
if (!readme.includes(`Зареєстровано ${guidePages.length} source-backed маршрутів із`)) {
  errors.push('README source-backed route count is stale');
}
if (readme.includes('Реально опубліковано 21')) errors.push('README contains stale count 21');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Guide validation passed: ${guidePages.length} source-backed pages across ${guideLevels.length} levels.`);
