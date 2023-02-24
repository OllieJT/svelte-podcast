import {
	audio_autoplay,
	audio_current_time,
	audio_duration,
	audio_ended,
	audio_loading,
	audio_muted,
	audio_paused,
	audio_src,
	audio_start_at,
} from '$lib/context/audio-internals';
import { user_preferences } from '$lib/context/user-preferences';
import type { AudioMetadata } from '$lib/types';
import { secondsToTimestamp } from '$lib/utility/seconds-to-timestamp';
import { derived, writable } from 'svelte/store';

export const time = derived([audio_current_time, audio_ended], ([$seconds, $ended]) => ({
	current_time: $seconds,
	timestamp: secondsToTimestamp($seconds),
	ended: $ended,
}));

export const metadata = writable<AudioMetadata | null>(null);

export const data = derived([audio_src, metadata], ([$src, $metadata]) => ({
	...$metadata,
	src: $src,
}));

export const options = derived([audio_start_at, audio_autoplay], ([$start_at, $autoplay]) => ({
	start_at: $start_at,
	autoplay: $autoplay,
}));

export const duration = { subscribe: audio_duration.subscribe };
export const loading = { subscribe: audio_loading.subscribe };
export const paused = { subscribe: audio_paused.subscribe };
export const muted = { subscribe: audio_muted.subscribe };
export const references = { subscribe: user_preferences.subscribe };
