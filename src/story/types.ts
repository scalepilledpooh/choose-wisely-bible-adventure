import type { EraId, LocationId, StoryId } from '../world/types';

export type FlagId = string;

export type Choice = {
  id: string;
  text: string;
  nextId: string;
  requiredFlags?: FlagId[];
  setFlags?: FlagId[];
};

export type Node = {
  id: string;
  title?: string;
  passage: string;
  reference?: string;
  choices: Choice[];
  isEnding?: boolean;
};

export type Story = {
  id: StoryId;
  title: string;
  description?: string;
  eraId: EraId;
  locationId: LocationId;
  startId: string;
  nodes: Record<string, Node>;
};
