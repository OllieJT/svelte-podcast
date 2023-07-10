import { writable } from 'svelte/store';

export interface EpisodeDetails {
	[key: string]: string | number | boolean;
}

/**
 * Episode details store.
 *
 * @returns {Writable<EpisodeDetails>} A Svelte writable store that contains metadata for the current episode.
 */
export const episode_details = writable<EpisodeDetails | null>(null);
