import { writable } from 'svelte/store';
import type { EpisodeDetails } from '../types';

export const episode_details = writable<EpisodeDetails | null>(null);
