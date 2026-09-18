import { artifacts, artifactCategories, getArtifactCategoryAnchor } from './artifacts';
import { guideLevels, getPagesForLevel } from './guide';
import { taskSpecs } from './task-specs';
import { taskFamilyEntries } from './task-families';
import type { HeaderMenuNode } from '../types/header-menu';

const taskFamilyNodes: HeaderMenuNode[] = taskFamilyEntries.map((family) => ({
  id: `tasks-${family.id}`,
  label: family.label,
  href: `/tasks#family-${family.id}`,
  children: taskSpecs
    .filter((task) => task.family === family.id)
    .map((task) => ({
      id: task.id,
      label: task.title,
      href: `/tasks#${task.id}`
    }))
}));

const levelNodes: HeaderMenuNode[] = guideLevels.map((level) => ({
  id: level.id,
  label: level.title,
  href: `/guide#${level.id}`,
  children: getPagesForLevel(level.id).map((page) => ({
    id: page.id,
    label: page.title,
    href: `/guide/${page.slug}`
  }))
}));

const artifactCategoryNodes: HeaderMenuNode[] = artifactCategories.map((category) => {
  const anchor = getArtifactCategoryAnchor(category);

  return {
    id: `artifacts-${anchor}`,
    label: category,
    href: `/artifacts#${anchor}`,
    children: artifacts
      .filter((artifact) => artifact.category === category)
      .map((artifact) => ({
        id: artifact.id,
        label: artifact.name,
        href: `/artifacts#${artifact.id}`
      }))
  };
});

export const headerMenuNodes: HeaderMenuNode[] = [
  {
    id: 'tasks',
    label: 'Постановки задач',
    href: '/tasks',
    children: taskFamilyNodes
  },
  {
    id: 'artifacts',
    label: 'Каталог артефактів',
    href: '/artifacts',
    children: artifactCategoryNodes
  },
  {
    id: 'levels',
    label: 'Подивитися рівні',
    href: '/#levels',
    children: levelNodes
  }
];

export const expandableHeaderMenuNodeIds = new Set(
  headerMenuNodes.flatMap((node) => [
    ...(node.children?.length ? [node.id] : []),
    ...(node.children?.flatMap((child) => (child.children?.length ? [child.id] : [])) ?? [])
  ])
);
