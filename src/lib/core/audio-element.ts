import { BROWSER } from 'esm-env';
import { derived, get } from 'svelte/store';
import { announce } from '../internal';
import { audio_state } from './audio-state';

const ELEMENT_ID = 'svpod--generated-audio-element';
const ssr_element = new Audio();
ssr_element.id = ELEMENT_ID;

/** A derived Svelte store containing an HTMLAudioElement or undefined. */
export const audio_element = derived(
	[audio_state],

	([$audio_state], set) => {
		// If not in a browser environment, return early.
		if (!BROWSER) {
			set(ssr_element);
			return () => null;
		}

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
	},
	ssr_element,
);

/**
 * Use audio element
 * @param {string} action - Action being performed
 * @returns {HTMLAudioElement} - Audio element
 * @throws {string} - Error message if no audio element exists
 */
export const use_audio_element = (action: string): HTMLAudioElement => {
	const el = get(audio_element);
	if (!el) {
		throw announce.error(`could not ${action} :: no audio element found`);
	}
	return el;
};
