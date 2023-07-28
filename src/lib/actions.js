import { BROWSER } from 'esm-env';
import clamp from 'just-clamp';

import { get } from 'svelte/store';
import { audio_attributes, use_audio_element } from './audio-element';
import { audio_metadata } from './audio-metadata';
import { audio_state } from './audio-state';
import { user_preferences } from './user-preferences';
import { user_progress } from './user-progress';

/**
 * Load audio
 * @param {string} src - Audio source
 * @param {import('./audio-metadata').AudioMetadata } metadata - Audio metadata
 * @returns {void}
 */
const load = (src, metadata = {}, autoplay = false) => {
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
 * @returns {void}
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

/**
 * @typedef {'toggle' | 'set'} HANDLE_TYPE
 */

/**
 * Play audio
 * @param {HANDLE_TYPE} t - Handle type
 * @returns {void}
 */
const play = (t = 'set') => {
	const el = use_audio_element('play');

	if (t === 'toggle') {
		el.paused ? el.play() : el.pause();
	} else {
		el.play();
	}
};

/**
 * Pause audio
 * @param {HANDLE_TYPE} t - Handle type
 * @returns {void}
 */
const pause = (t = 'set') => {
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
 * @param {HANDLE_TYPE} t - Handle type
 * @returns {void}
 */
const mute = (t = 'set') => {
	const el = use_audio_element('mute');

	if (t === 'toggle') {
		el.muted = !el.muted;
	} else {
		el.muted = true;
	}
};

/**
 * Unmute audio
 * @param {HANDLE_TYPE} t - Handle type
 * @returns {void}
 */
const unmute = (t = 'set') => {
	const el = use_audio_element('unmute');

	if (t === 'toggle') {
		el.muted = !el.muted;
	} else {
		el.muted = false;
	}
};

/**
 * Seek to time audio
 * @param {number} seconds - Seconds to seek
 * @param {'from-start' | 'from-end'} [from="from-start"] - Seek from start or end
 * @returns {void}
 */
const seek = (seconds, from = 'from-start') => {
	const el = use_audio_element('seek');

	if (from === 'from-end') {
		el.currentTime = clamp(0, el.duration, el.duration - seconds);
	} else {
		el.currentTime = clamp(0, el.duration, seconds);
	}
};

/**
 * Skip by about audio
 * @param {number} seconds - Seconds to skip
 * @param {'forward' | 'backward'} [type='forward'] - Skip forward or backward
 * @returns {void}
 */
const skip = (seconds, type = 'forward') => {
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
