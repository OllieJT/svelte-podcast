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
const load_src = (src: string, metadata: AudioMetadata) => {
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
	});

	// Set metadata for current audio
	audio_metadata.set(metadata);
};

/**
 * Unload audio
 */
const unload_src = () => {
	if (!BROWSER) return;

	// Save the current progress if audio is already loaded
	user_progress.save();

	// Unset audio element source
	audio_state.set(null);

	// Unset metadata
	audio_metadata.set(null);
};

/**
 * Play / Pause audio
 * @param  playing - Set or toggle the play state
 */
const play = (playing: boolean | 'toggle' = 'toggle') => {
	const el = use_audio_element('play');
	console.log(el, el.paused);

	if (typeof playing === 'boolean') {
		playing ? el.play() : el.pause();
	} else {
		el.paused ? el.play() : el.pause();
	}
};

/**
 * Mute / Unmute audio
 * @param  muted - Set or toggle the mute state
 */
const mute = (muted: boolean | 'toggle' = 'toggle') => {
	const el = use_audio_element('mute');

	if (typeof muted === 'boolean') {
		el.muted = muted;
	} else {
		el.muted = !el.muted;
	}
};

/**
 * Seeks to a specific time in the audio.
 * @param seconds Timestamp in seconds
 * @param from Seek from-start or from-end
 */
const seek_to = (
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
 * Skips the audio forward or backward by a specified number of seconds.
 * @param seconds - Time to skip in seconds
 * @param type [type='forward'] - Skip forward or backward
 */
const skip_by = (seconds: number, type: 'forward' | 'backward' = 'forward') => {
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
	src: {
		load: load_src,
		unload: unload_src,
	},
	play,
	mute,
	seek_to,
	skip_by,
};
