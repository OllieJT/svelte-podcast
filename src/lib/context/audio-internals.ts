import type { PlayerElement } from '$lib/types/types';
import { writable } from 'svelte/store';

export const audio_element = writable<PlayerElement>();
export const audio_start_at = writable<number>(0);

export const audio_autoplay = writable<boolean>(false);
export const audio_current_time = writable<number>(0);
export const audio_muted = writable<boolean>(false);
export const audio_playback_rate = writable<number>(1);
export const audio_src = writable<string>('');
export const audio_volume = writable<number>(1);

export type PlayerMetadata = {
	duration: number;
	// muted: boolean;
	paused: boolean;
	// playbackRate: number;
	loading: boolean;
	ended: boolean;
};

export const audio_metadata = writable<PlayerMetadata>({
	duration: 0,
	ended: false,
	loading: false,
	paused: true,
	// muted: false,
	// playbackRate: 1,
});
