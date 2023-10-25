export const bloomLevels = [
  'remembering',
  'understanding',
  'applying',
  'analyzing',
  'evaluating',
  'creating',
] as const;

export type BloomsLevel = (typeof bloomLevels)[number];
