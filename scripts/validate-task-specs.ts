import { artifacts } from '../src/data/artifacts';
import { guideContentByLevel } from '../src/data/content';
import { guideLevels, guidePages } from '../src/data/guide';
import { taskSpecs } from '../src/data/task-specs';

const errors: string[] = [];
const ids = new Set<string>();
const types = new Set<string>();
const artifactIds = new Set(artifacts.map((artifact) => artifact.id));
const pageById = new Map(guidePages.map((page) => [page.id, page]));
const validModes = new Set(['general', 'modernization', 'migration']);
const validFamilies = new Set(['foundations', 'discovery', 'delivery', 'automation', 'governance', 'legacy-transition']);
const levelsCovered = new Set<string>();
const labLocations = new Map<string, string>();

for (const content of Object.values(guideContentByLevel)) {
  for (const [pageId, sections] of Object.entries(content)) {
    for (const section of sections) {
      if (section.lab) {
        if (labLocations.has(section.lab.id)) errors.push(`Duplicate guide lab id: ${section.lab.id}`);
        labLocations.set(section.lab.id, pageId);
      }
    }
  }
}

const hasUnsupportedPlaceholder = (content: string) => /\b(?:TODO|TBD)\b|\.\.\./.test(content);

for (const task of taskSpecs) {
  if (ids.has(task.id)) errors.push(`Duplicate task spec id: ${task.id}`);
  ids.add(task.id);
  types.add(task.type);
  if (!task.title.trim()) errors.push(`Empty task spec title: ${task.id}`);
  if (!validModes.has(task.mode)) errors.push(`Invalid task mode: ${task.id}`);
  if (!validFamilies.has(task.family)) errors.push(`Invalid task family: ${task.id}`);
  for (const [key, value] of Object.entries({ goal: task.goal, note: task.note })) {
    if (!value.trim()) errors.push(`Empty ${key}: ${task.id}`);
  }
  for (const [key, values] of Object.entries({ scope: task.scope, nonGoals: task.nonGoals, success: task.success, rules: task.rules, artifactIds: task.artifactIds, artifactExamples: task.artifactExamples, sourceLessonIds: task.sourceLessonIds })) {
    if (!values.length) errors.push(`Missing ${key}: ${task.id}`);
  }
  for (const sourceId of task.sourceLessonIds) {
    const page = pageById.get(sourceId);
    if (!page) {
      errors.push(`Unknown task source lesson: ${task.id} -> ${sourceId}`);
    } else {
      levelsCovered.add(page.levelId);
    }
  }
  for (const labId of task.sourceLabIds ?? []) {
    const pageId = labLocations.get(labId);
    if (!pageId) errors.push(`Unknown task source lab: ${task.id} -> ${labId}`);
    else if (!task.sourceLessonIds.includes(pageId)) errors.push(`Lab source lesson missing: ${task.id} -> ${labId} (${pageId})`);
  }
  for (const artifactId of task.artifactIds) {
    if (!artifactIds.has(artifactId)) errors.push(`Unknown task artifact: ${task.id} -> ${artifactId}`);
  }
  const exampleIds = new Set<string>();
  for (const example of task.artifactExamples) {
    if (exampleIds.has(example.artifactId)) errors.push(`Duplicate task artifact example: ${task.id} -> ${example.artifactId}`);
    exampleIds.add(example.artifactId);
    if (!artifactIds.has(example.artifactId)) errors.push(`Unknown task artifact example: ${task.id} -> ${example.artifactId}`);
    if (!example.content.trim()) errors.push(`Empty task artifact example: ${task.id} -> ${example.artifactId}`);
    if (!task.artifactIds.includes(example.artifactId)) errors.push(`Unlisted task artifact example: ${task.id} -> ${example.artifactId}`);
    if (hasUnsupportedPlaceholder(example.content)) errors.push(`Unfilled placeholder in task artifact example: ${task.id} -> ${example.artifactId}`);
  }
  if (!/documented example/i.test(task.note) && !/documented example/i.test(task.artifactExamples.map((example) => example.content).join('\n'))) {
    errors.push(`Missing documented-example boundary: ${task.id}`);
  }
}

for (const level of guideLevels) {
  if (!levelsCovered.has(level.id)) errors.push(`Task catalog does not cover ${level.id}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Task specification validation passed: ${taskSpecs.length} types, ${levelsCovered.size} levels, ${taskSpecs.filter((task) => task.sourceLabIds?.length).length} lab-backed types.`);
