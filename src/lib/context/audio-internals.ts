import type { PlayerElement, PlayerMetadata } from '$lib/types/types';
import { writable } from 'svelte/store';

export const audio_current_time = writable<number>(0);
export const audio_src = writable<string | null>(null);
export const audio_element = writable<PlayerElement>();
export const audio_metadata = writable<PlayerMetadata>({
	duration: 0,
	muted: false,
	paused: true,
	playbackRate: 1,
	loading: false,
});
