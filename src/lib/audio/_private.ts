import type { AudioMetadata, AudioPlayerElement } from '$lib/types';
import { writable } from 'svelte/store';

// readonly - stores will update when bindings change
export const _current_time = writable<number>(0);
export const _element = writable<AudioPlayerElement>();
export const _duration = writable<number>(0);
export const _ended = writable<boolean>(false);
export const _loading = writable<boolean>(false);
export const _paused = writable<boolean>(true);

// handlers - when store value changes, the binding will update the audio element
export const _start_at = writable<number>(0);
export const _autoplay = writable<boolean>(false);
export const _muted = writable<boolean>(false);
export const _src = writable<string>('');
export const _metadata = writable<AudioMetadata | null>(null);
