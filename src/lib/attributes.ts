import { derived } from 'svelte/store';
import { audio_element } from './core/audio-element';
import { audio_metadata } from './core/audio-metadata';
import { seconds_to_timestamp } from './utility';

/**
 * @typedef {Object} AudioAttributes
 * @property {boolean} is_loaded - Whether the audio element is loaded or not
 * @property {boolean} is_paused - Whether the audio element is paused or not
 * @property {number} current_time - The current time of the audio element in seconds
 * @property {number} duration - The duration of the audio element in seconds
 * @property {string} timestamp_current - The current time of the audio element in timestamp format (hh:mm:ss)
 * @property {string} timestamp_end - The end time of the audio element in timestamp format (hh:mm:ss)
 * @property {import('./core/audio-metadata').AudioMetadata | null } metadata - Audio metadata
 */

/** @type {import('svelte/store').Readable<AudioAttributes>} */
export const audio_attributes = derived(
	[audio_element, audio_metadata],
	([$el, $meta], set) => {
		if (!$el) {
			return set({
				is_loaded: false,
				is_paused: true,
				current_time: 0,
				duration: 0,
				timestamp_current: seconds_to_timestamp(0),
				timestamp_end: seconds_to_timestamp(0),
				metadata: null,
			});
		}

		set({
			is_loaded: Boolean($el.src),
			is_paused: $el.paused,
			current_time: $el.currentTime,
			duration: $el.duration,
			timestamp_current: seconds_to_timestamp($el.currentTime),
			timestamp_end: seconds_to_timestamp($el.duration),
			metadata: $meta,
		});
	},
);
