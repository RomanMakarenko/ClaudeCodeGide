import type { TaskFamily } from '../types/task-spec';

export const taskFamilyEntries: { id: TaskFamily; label: string }[] = [
  { id: 'foundations', label: 'Основи постановки' },
  { id: 'discovery', label: 'Discovery та evidence' },
  { id: 'delivery', label: 'Реалізація й delivery' },
  { id: 'automation', label: 'Automation та інтеграції' },
  { id: 'governance', label: 'Quality і governance' },
  { id: 'legacy-transition', label: 'Legacy transition' }
];
