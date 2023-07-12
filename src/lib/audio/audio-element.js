import { BROWSER } from 'esm-env';
import { derived, get } from 'svelte/store';
import { announce } from '../internal';
import { seconds_to_timestamp } from '../utility';
import { audio_element_source } from './audio-element-source';

/**
 * @typedef {import('svelte/store').Readable<HTMLAudioElement | undefined>} ReadableAudioElement
 */

/**
 * @typedef {import('../user').UserPreferences} Preferences
 */

/**
 * @typedef {(value: HTMLAudioElement | undefined) => void} SetAudioElement
 */

const ELEMENT_ID = 'svpod--generated-audio-element';

/** @type {ReadableAudioElement} */
export const audio_element = derived(
	[audio_element_source],

	([$audio_element_src], /** @type {SetAudioElement} */ set) => {
		// If not in a browser environment, return early.
		console.log('BROWSER', BROWSER);
		if (BROWSER) {
			// Find an existing HTMLAudioElement or create a new one.
			const found = document.getElementById(ELEMENT_ID);
			const el =
				found instanceof HTMLAudioElement
					? found
					: document.createElement('audio');

			// Set the HTMLAudioElement's attributes.
			el.id = ELEMENT_ID;
			el.setAttribute('preload', 'metadata');
			el.muted = false;
			el.autoplay = false;
			el.controls = false;

			if ($audio_element_src) {
				el.src = $audio_element_src.src;
				el.currentTime = $audio_element_src.start_at;
				el.playbackRate = $audio_element_src.playback_rate || 1;
				el.volume = $audio_element_src.volume || 1;
			}
			console.log('$audio_element_src', $audio_element_src);

			console.log('$preferences');

			// If a new HTMLAudioElement was created, append it to the body.
			if (!found) document.body.appendChild(el);

			// Define a function to set the HTMLAudioElement and call it.
			const handle_update = () => {
				set(el);
				announce.info('Updating audio element');
			};

			handle_update();

			// Add event listeners to the HTMLAudioElement to update the store when it changes.
			el.addEventListener('loadeddata', handle_update);
			el.addEventListener('pause', handle_update);
			el.addEventListener('playing', handle_update);
			el.addEventListener('timeupdate', handle_update);

			// Return a function to clean up the HTMLAudioElement when the store unsubscribes.
			return () => {
				// Remove the event listeners from the HTMLAudioElement.
				el.removeEventListener('loadeddata', handle_update);
				el.removeEventListener('pause', handle_update);
				el.removeEventListener('playing', handle_update);
				el.removeEventListener('timeupdate', handle_update);

				// Remove the HTMLAudioElement from the DOM.
				el ? el.remove() : null;
			};
		} else {
			set(undefined);
			return () => null;
		}
	},
	undefined,
);

/**
 * Use audio element
 * @param {string} action - Action being performed
 * @returns {HTMLAudioElement} - Audio element
 * @throws {string} - Error message if no audio element exists
 */
export const use_audio_element = (action) => {
	const el = get(audio_element);
	if (!el) {
		throw announce.error(`could not ${action} :: no audio element found`);
	}
	return el;
};

/**
 * @typedef {Object} AudioAttributes
 * @property {boolean} is_loaded - Whether the audio element is loaded or not
 * @property {boolean} is_paused - Whether the audio element is paused or not
 * @property {number} current_time - The current time of the audio element in seconds
 * @property {number} duration - The duration of the audio element in seconds
 * @property {string} timestamp_current - The current time of the audio element in timestamp format (hh:mm:ss)
 * @property {string} timestamp_end - The end time of the audio element in timestamp format (hh:mm:ss)
 */

/** @type {import('svelte/store').Readable<AudioAttributes>} */
export const audio_attributes = derived(audio_element, ($el, set) => {
	if (!$el) {
		return set({
			is_loaded: false,
			is_paused: true,
			current_time: 0,
			duration: 0,
			timestamp_current: seconds_to_timestamp(0),
			timestamp_end: seconds_to_timestamp(0),
		});
	}

	set({
		is_loaded: Boolean($el.src),
		is_paused: $el.paused,
		current_time: $el.currentTime,
		duration: $el.duration,
		timestamp_current: seconds_to_timestamp($el.currentTime),
		timestamp_end: seconds_to_timestamp($el.duration),
	});
});
