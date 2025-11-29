import type { BaseLocation, Era, EraLocationMeta, EraId } from './types';
import {
  callOfDisciples,
  storiesById as allStoriesById,
  goodSamaritan,
  stormOnSea,
  nazarethRejection,
  petersDenial
} from '../story';

export const defaultEraId: EraId = 'jesus';

export const eras: Era[] = [
  {
    id: 'jesus',
    label: 'Time of Jesus',
    yearRange: 'c. AD 26–33',
    mapImageUrl: '/maps/jesus-era.svg'
  },
  {
    id: 'david',
    label: 'Time of David',
    yearRange: 'c. 1010–970 BC',
    mapImageUrl: '/maps/jesus-era.svg',
    comingSoon: true
  },
  {
    id: 'exile',
    label: 'Babylonian Exile',
    yearRange: 'c. 586–538 BC',
    mapImageUrl: '/maps/jesus-era.svg',
    comingSoon: true
  }
];

export const baseLocations: BaseLocation[] = [
  { id: 'capernaum', baseName: 'Capernaum', coords: { x: 0.55, y: 0.34 } },
  { id: 'sea_of_galilee', baseName: 'Sea of Galilee', coords: { x: 0.63, y: 0.38 } },
  { id: 'nazareth', baseName: 'Nazareth', coords: { x: 0.48, y: 0.45 } },
  { id: 'jerusalem', baseName: 'Jerusalem', coords: { x: 0.56, y: 0.72 } },
  { id: 'jericho', baseName: 'Jericho', coords: { x: 0.65, y: 0.7 } }
];

export const eraLocations: EraLocationMeta[] = [
  {
    eraId: 'jesus',
    locationId: 'capernaum',
    displayName: 'Capernaum',
    description: 'Fishing hub on the north shore; Roman garrison nearby and crowds hungry for teaching.',
    storyIds: [callOfDisciples.id]
  },
  {
    eraId: 'jesus',
    locationId: 'sea_of_galilee',
    displayName: 'Sea of Galilee',
    description: 'Deep freshwater lake where storms rise fast and fishermen know every cove.',
    storyIds: [stormOnSea.id]
  },
  {
    eraId: 'jesus',
    locationId: 'nazareth',
    displayName: 'Nazareth',
    description: 'Hill village that raised Jesus; skeptical neighbors and familiar faces.',
    storyIds: [nazarethRejection.id]
  },
  {
    eraId: 'jesus',
    locationId: 'jerusalem',
    displayName: 'Jerusalem (Judea)',
    description: 'City under Roman rule with a restless temple mount and crowded courtyards.',
    storyIds: [petersDenial.id]
  },
  {
    eraId: 'jesus',
    locationId: 'jericho',
    displayName: 'Road to Jericho',
    description: 'Steep descent from Jerusalem through bandit territory and watchful travelers.',
    storyIds: [goodSamaritan.id]
  }
];

export const storiesById = allStoriesById;
