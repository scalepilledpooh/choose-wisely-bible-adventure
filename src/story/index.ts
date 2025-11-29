export * from './types';
import { goodSamaritan } from './goodSamaritan';
import { callOfDisciples } from './callOfDisciples';
import { stormOnSea } from './stormOnSea';
import { nazarethRejection } from './nazarethRejection';
import { petersDenial } from './petersDenial';

export { goodSamaritan, callOfDisciples, stormOnSea, nazarethRejection, petersDenial };

export const stories = [goodSamaritan, callOfDisciples, stormOnSea, nazarethRejection, petersDenial];
export const storiesById = Object.fromEntries(stories.map((story) => [story.id, story]));
