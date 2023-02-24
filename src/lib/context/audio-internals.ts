import type { AudioPlayerElement } from '$lib/types';
import { writable } from 'svelte/store';

// readonly - stores will update when bindings change
export const audio_current_time = writable<number>(0);
export const audio_element = writable<AudioPlayerElement>();
export const audio_duration = writable<number>(0);
export const audio_ended = writable<boolean>(false);
export const audio_loading = writable<boolean>(false);
export const audio_paused = writable<boolean>(true);

// handlers - when store value changes, the binding will update the audio element
export const audio_start_at = writable<number>(0);
export const audio_autoplay = writable<boolean>(false);
export const audio_muted = writable<boolean>(false);
export const audio_src = writable<string>('');
