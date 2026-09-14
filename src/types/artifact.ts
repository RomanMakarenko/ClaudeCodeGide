export type ArtifactStatus = 'present' | 'documented-example' | 'variant' | 'external-source';

export type ArtifactPath = {
  value: string;
  scope: 'repository' | 'user' | 'external' | 'generated';
  status: ArtifactStatus;
};

export type ArtifactField = {
  name: string;
  description: string;
  requirement: 'required' | 'optional' | 'conventional';
  example?: string;
};

export type Artifact = {
  id: string;
  name: string;
  category: string;
  responsibility: string;
  role: string;
  paths: ArtifactPath[];
  fields: ArtifactField[];
  whenToUse: string;
  poorChoiceWhen: string;
  status: ArtifactStatus;
  template: string;
  aliases?: string[];
  versionNote?: string;
  sourceRefs: string[];
};
