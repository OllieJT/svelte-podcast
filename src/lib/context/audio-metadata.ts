import { writable } from 'svelte/store';

export type AudioMetadata = {
	title: string;
	artwork: string;
};

export const audio_metadata = writable<AudioMetadata | null>(null);
