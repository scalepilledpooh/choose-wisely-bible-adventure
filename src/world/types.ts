export type StoryId = string;

export type EraId = 'abraham' | 'david' | 'exile' | 'jesus' | 'early_church';
export type LocationId =
  | 'jerusalem'
  | 'bethlehem'
  | 'nineveh'
  | 'babylon'
  | 'sea_of_galilee'
  | 'capernaum'
  | 'nazareth'
  | 'jericho';

export type BaseLocation = {
  id: LocationId;
  baseName: string;
  coords: { x: number; y: number }; // normalized 0-1 coordinates for map pins
};

export type EraLocationMeta = {
  eraId: EraId;
  locationId: LocationId;
  displayName: string;
  description?: string;
  storyIds: StoryId[];
};

export type Era = {
  id: EraId;
  label: string;
  yearRange: string;
  mapImageUrl: string;
  comingSoon?: boolean;
};

export type WorldData = {
  eras: Era[];
  baseLocations: BaseLocation[];
  eraLocations: EraLocationMeta[];
};
