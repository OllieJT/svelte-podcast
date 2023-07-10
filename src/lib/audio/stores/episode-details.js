import { writable } from 'svelte/store';

/**
 * @typedef {Object.<string, unknown>} EpisodeDetails
 */

/**
 * Episode details store.
 * @type {import('svelte/store').Writable<EpisodeDetails | null>}
 * @description This store holds the metadata for a single episode.
 */
export const episode_details = writable(null);
