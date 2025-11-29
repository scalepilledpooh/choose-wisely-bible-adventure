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
  id: string;
  title: string;
  description?: string;
  startId: string;
  nodes: Record<string, Node>;
};
