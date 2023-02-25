import { writable } from 'svelte/store';

export type EpisodeDetails = Record<string, string | number | boolean> | null;
export const episode_details = writable<EpisodeDetails>(null);
export type EpisodeDetailsStore = typeof episode_details;
