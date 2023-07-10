import clamp from 'just-clamp';
import { derived, get } from 'svelte/store';
import { user_preferences, user_progress } from '../../user';
import { announce } from '../../utility';
import { audio_element } from './audio-element';
import { episode_details } from './episode-details';

/**
 * Episode state object
 * @typedef {Object} EpisodeState
 * @property {boolean} will_autoplay - Whether the episode will autoplay
 * @property {boolean} is_paused - Whether the episode is paused
 * @property {number} duration - The duration of the episode
 * @property {string} src - The source of the episode
 * @property {number} start_at - The starting point of the episode
 * @property {import('./episode-details').EpisodeDetails | null} details - The details of the episode or null if there are none
 */

/** @type {Omit<EpisodeState, 'src'>} */
const default_episode_state = {
	will_autoplay: false,
	is_paused: true,
	duration: 0,
	start_at: 0,
	details: null,
};

/**
 * Episode state store
 * @type {import('svelte/store').Readable<EpisodeState | null>}
 */
const episode_state = derived([audio_element, episode_details], ([$audio, $details], set) => {
	if (!$audio) return set(null);

	function set_value() {
		if (!$audio?.src) return null;
		set({
			...default_episode_state,
			src: $audio.src,
			duration: $audio.duration,
			details: $details,
			will_autoplay: $audio.autoplay,
			is_paused: $audio.paused,
			start_at: user_progress.get($audio.src) ?? 0,
		});
	}

	$audio.addEventListener('loadeddata', set_value);
	$audio.addEventListener('pause', set_value);
	$audio.addEventListener('playing', set_value);

	return () => {
		$audio.removeEventListener('loadeddata', set_value);
		$audio.removeEventListener('pause', set_value);
		$audio.removeEventListener('playing', set_value);
	};
});

/**
 * @typedef {'toggle' | 'set'} HANDLE_TYPE
 */

/**
 * Use audio element
 * @param {string} action - Action to perform
 * @returns {HTMLAudioElement} - Audio element
 * @throws {string} - Error message if no audio element exists
 */
const use_element = (action) => {
	const el = get(audio_element);
	if (!el) throw announce.warn(`could not ${action} :: no audio element exists yet`);
	return el;
};

/**
 * Load audio
 * @param {string} src - Audio source
 * @param {import('./episode-details').EpisodeDetails } details - Episode details
 * @returns {void}
 */
const load_audio = (src, details) => {
	user_progress.save();
	const el = use_element('load');
	el.src = src;
	el.muted = false;

	// using user_progress
	const start_at = user_progress.get(src) || 0;
	el.currentTime = start_at;

	// using user_preferences
	const preferences = get(user_preferences);
	el.playbackRate = preferences.playback_rate;
	el.volume = preferences.volume;

	episode_details.set(details);
};

/**
 * Unload audio
 * @returns {void}
 */
const unload_audio = () => {
	user_progress.save();
	const el = use_element('unload');
	el.src = '';
	episode_details.set(null);
};

/**
 * Play audio
 * @param {HANDLE_TYPE} t - Handle type
 * @returns {void}
 */
const play_audio = (t = 'set') => {
	const el = use_element('play');

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
const pause_audio = (t = 'set') => {
	user_progress.save();
	const el = use_element('pause');

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
const mute_audio = (t = 'set') => {
	const el = use_element('mute');

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
const unmute_audio = (t = 'set') => {
	const el = use_element('unmute');

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
const seek_audio = (seconds, from = 'from-start') => {
	const el = use_element('seek');

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
const skip_audio = (seconds, type = 'forward') => {
	const el = use_element('skip');

	if (type === 'backward') {
		el.currentTime = clamp(0, el.duration, el.currentTime - seconds);
	} else {
		el.currentTime = clamp(0, el.duration, el.currentTime + seconds);
	}
};

/**
 * Episode audio object
 */
export const episode_audio = {
	/**
	 * Subscribes to episode audio store
	 */
	subscribe: episode_state.subscribe,

	load: load_audio,
	unload: unload_audio,

	play: play_audio,
	pause: pause_audio,
	mute: mute_audio,
	unmute: unmute_audio,
	seek: seek_audio,
	skip: skip_audio,
};
