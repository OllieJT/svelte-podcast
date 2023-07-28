import { BROWSER } from 'esm-env';
import { derived, get } from 'svelte/store';
import { audio_state } from './audio-state';
import { announce } from './internal';

/**
 * @typedef {import('svelte/store').Readable<HTMLAudioElement | undefined>} ReadableAudioElement
 */

/**
 * @typedef {import('./user-preferences').UserPreferences} Preferences
 */

/**
 * @typedef {(value: HTMLAudioElement | undefined) => void} SetAudioElement
 */

const ELEMENT_ID = 'svpod--generated-audio-element';

/** @type {ReadableAudioElement} */
export const audio_element = derived(
	[audio_state],

	([$audio_state], /** @type {SetAudioElement} */ set) => {
		// If not in a browser environment, return early.
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

			if ($audio_state) {
				el.src = $audio_state.src;
				el.currentTime = $audio_state.start_at;
				el.playbackRate = $audio_state.playback_rate || 1;
				el.volume = $audio_state.volume || 1;
				el.autoplay = $audio_state.autoplay || false;
			}

			// If a new HTMLAudioElement was created, append it to the body.
			if (!found) document.body.appendChild(el);

			// Define a function to set the HTMLAudioElement and call it.
			const handle_update = () => {
				set(el);
				$audio_state?.autoplay && el.play();
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
