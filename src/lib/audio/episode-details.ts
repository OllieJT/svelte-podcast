import type { EpisodeDetails } from '$lib/types';
import { writable } from 'svelte/store';

export const episode_details = writable<EpisodeDetails | null>(null);
export type EpisodeDetailsStore = typeof episode_details;
