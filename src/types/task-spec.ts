export type TaskMode = 'general' | 'modernization' | 'migration';

export type TaskFamily =
  | 'foundations'
  | 'discovery'
  | 'delivery'
  | 'automation'
  | 'governance'
  | 'legacy-transition';

export type TaskType =
  | 'environment-setup'
  | 'git-baseline'
  | 'feature'
  | 'bugfix'
  | 'refactoring'
  | 'characterization'
  | 'tests'
  | 'documentation'
  | 'investigation-diagnosis'
  | 'codebase-discovery'
  | 'acceptance-verification'
  | 'issue-intake'
  | 'implementation-plan'
  | 'pr-slicing'
  | 'handoff-recovery'
  | 'extensions-evaluation'
  | 'agent-orchestration'
  | 'ci-build'
  | 'quality-release'
  | 'risk-policy'
  | 'capstone'
  | 'modernization'
  | 'migration';

export type TaskArtifactExample = {
  artifactId: string;
  content: string;
};

export type TaskSpec = {
  id: string;
  type: TaskType;
  family: TaskFamily;
  title: string;
  mode: TaskMode;
  goal: string;
  scope: string[];
  nonGoals: string[];
  success: string[];
  rules: string[];
  artifactIds: string[];
  artifactExamples: TaskArtifactExample[];
  sourceLessonIds: string[];
  sourceLabIds?: string[];
  note: string;
};
