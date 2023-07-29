import { BROWSER } from 'esm-env';
import clamp from 'just-clamp';

import { get } from 'svelte/store';
import { use_audio_element } from './_internal_/audio-element';
import { audio_metadata } from './_internal_/audio-metadata';
import { audio_state } from './_internal_/audio-state';
import { audio_attributes } from './attributes';
import type { AudioMetadata } from './metadata';
import { user_preferences } from './user-preferences';
import { user_progress } from './user-progress';

/**
 * Load audio
 * @param  src - Audio source
 * @param  metadata - Audio metadata
 */
const load = (src: string, metadata: AudioMetadata = {}, autoplay = false) => {
	if (!BROWSER) return;

	// Save the current progress if audio is already loaded
	user_progress.save();

	// Get user preferences
	const preferences = get(user_preferences);

	// Set audio element source
	audio_state.set({
		src,
		start_at: user_progress.get(src) || 0,
		playback_rate: preferences.playback_rate,
		volume: preferences.volume,
		autoplay: autoplay,
	});

	// Set metadata for current audio
	audio_metadata.set(metadata);
};

/**
 * Unload audio
 */
const unload = () => {
	if (!BROWSER) return;

	// Save the current progress if audio is already loaded
	user_progress.save();

	// Unset audio element source
	audio_state.set(null);

	// Unset metadata
	audio_metadata.set(null);
};

type HANDLE_TYPE = 'toggle' | 'set';

/**
 * Play audio
 * @param  t - Handle type
 */
const play = (t: HANDLE_TYPE = 'set') => {
	const el = use_audio_element('play');

	if (t === 'toggle') {
		el.paused ? el.play() : el.pause();
	} else {
		el.play();
	}
};

/**
 * Pause audio
 * @param  t - Handle type
 */
const pause = (t: HANDLE_TYPE = 'set') => {
	user_progress.save();
	const el = use_audio_element('pause');

	if (t === 'toggle') {
		el.paused ? el.play() : el.pause();
	} else {
		el.pause();
	}
};

/**
 * Mute audio
 * @param  t - Handle type
 */
const mute = (t: HANDLE_TYPE = 'set') => {
	const el = use_audio_element('mute');

	if (t === 'toggle') {
		el.muted = !el.muted;
	} else {
		el.muted = true;
	}
};

/**
 * Unmute audio
 * @param  t - Handle type
 */
const unmute = (t: HANDLE_TYPE = 'set') => {
	const el = use_audio_element('unmute');

	if (t === 'toggle') {
		el.muted = !el.muted;
	} else {
		el.muted = false;
	}
};

/**
 * Seek to time audio
 * @param seconds - Seconds to seek
 * @param from- Seek from start or end
 */
const seek = (
	seconds: number,
	from: 'from-start' | 'from-end' = 'from-start',
) => {
	const el = use_audio_element('seek');

	if (from === 'from-end') {
		el.currentTime = clamp(0, el.duration, el.duration - seconds);
	} else {
		el.currentTime = clamp(0, el.duration, seconds);
	}
};

/**
 * Skip by about audio
 * @param seconds - Seconds to skip
 * @param type [type='forward'] - Skip forward or backward
 */
const skip = (seconds: number, type: 'forward' | 'backward' = 'forward') => {
	const el = use_audio_element('skip');

	if (type === 'backward') {
		el.currentTime = clamp(0, el.duration, el.currentTime - seconds);
	} else {
		el.currentTime = clamp(0, el.duration, el.currentTime + seconds);
	}
};

/**
 *  Audio controls
 */
export const audio = {
	subscribe: audio_attributes.subscribe,
	load,
	unload,
	play,
	pause,
	mute,
	unmute,
	seek,
	skip,
};
