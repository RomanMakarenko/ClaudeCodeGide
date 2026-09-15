import { artifacts, artifactQuickJumpGroups } from '../src/data/artifacts';
import { guideContentByLevel } from '../src/data/content';

const errors: string[] = [];
const ids = new Set<string>();
const names = new Set<string>();
const validStatuses = new Set(['present', 'documented-example', 'variant', 'external-source']);
const validScopes = new Set(['repository', 'user', 'external', 'generated']);
const validRequirements = new Set(['required', 'optional', 'conventional']);

for (const artifact of artifacts) {
  if (ids.has(artifact.id)) errors.push(`Duplicate artifact id: ${artifact.id}`);
  if (names.has(artifact.name)) errors.push(`Duplicate artifact name: ${artifact.name}`);
  ids.add(artifact.id);
  names.add(artifact.name);

  for (const [key, value] of Object.entries({ responsibility: artifact.responsibility, role: artifact.role, whenToUse: artifact.whenToUse, poorChoiceWhen: artifact.poorChoiceWhen })) {
    if (!value.trim()) errors.push(`Empty ${key}: ${artifact.id}`);
  }
  if (!validStatuses.has(artifact.status)) errors.push(`Invalid status: ${artifact.id}`);
  if (!artifact.template?.trim()) errors.push(`Missing template: ${artifact.id}`);
  if (!artifact.paths.length) errors.push(`Missing paths: ${artifact.id}`);
  if (!artifact.fields.length) errors.push(`Missing fields: ${artifact.id}`);
  if (!artifact.sourceRefs.length) errors.push(`Missing source references: ${artifact.id}`);

  const fieldNames = new Set<string>();
  for (const field of artifact.fields) {
    if (fieldNames.has(field.name)) errors.push(`Duplicate field ${field.name}: ${artifact.id}`);
    fieldNames.add(field.name);
    if (!field.name.trim() || !field.description.trim()) errors.push(`Incomplete field: ${artifact.id}`);
    if (!validRequirements.has(field.requirement)) errors.push(`Invalid field requirement: ${artifact.id}.${field.name}`);
  }

  for (const path of artifact.paths) {
    if (!path.value.trim()) errors.push(`Empty path: ${artifact.id}`);
    if (!validScopes.has(path.scope)) errors.push(`Invalid path scope: ${artifact.id}.${path.value}`);
    if (!validStatuses.has(path.status)) errors.push(`Invalid path status: ${artifact.id}.${path.value}`);
  }
}

const referencedArtifactIds = new Set<string>();
const labIds = new Set<string>();
for (const levelContent of Object.values(guideContentByLevel)) {
  for (const sections of Object.values(levelContent)) {
    for (const section of sections) {
      for (const artifactId of section.artifactIds ?? []) referencedArtifactIds.add(artifactId);
      if (!section.lab) continue;
      if (labIds.has(section.lab.id)) errors.push(`Duplicate lab id: ${section.lab.id}`);
      labIds.add(section.lab.id);
      if (!section.lab.title.trim() || !section.lab.goal.trim() || !section.lab.steps.length || !section.lab.sourceRefs.length) {
        errors.push(`Incomplete lab: ${section.lab.id}`);
      }
      for (const artifactId of section.lab.artifactIds ?? []) referencedArtifactIds.add(artifactId);
    }
  }
}

for (const artifactId of referencedArtifactIds) {
  if (!ids.has(artifactId)) errors.push(`Unknown referenced artifact: ${artifactId}`);
}

const quickJumpIds = new Set<string>();
for (const group of artifactQuickJumpGroups) {
  if (!group.label.trim()) errors.push('Empty quick-jump group label');
  if (!group.description.trim()) errors.push(`Empty quick-jump group description: ${group.label}`);
  for (const artifactId of group.artifactIds) {
    if (!ids.has(artifactId)) errors.push(`Unknown quick-jump artifact: ${artifactId}`);
    if (quickJumpIds.has(artifactId)) errors.push(`Duplicate quick-jump artifact: ${artifactId}`);
    quickJumpIds.add(artifactId);
  }
}

for (const artifactId of ids) {
  if (!quickJumpIds.has(artifactId)) errors.push(`Artifact missing from quick-jump: ${artifactId}`);
}

if (ids.has('validation-script')) errors.push('Internal guide validator must not be a catalog artifact: validation-script');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Artifact validation passed: ${artifacts.length} artifacts.`);
