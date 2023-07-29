import { BROWSER } from 'esm-env';
import { derived, get, type Readable } from 'svelte/store';
import { announce } from './announce';
import { audio_state } from './audio-state';

const ELEMENT_ID = 'svpod--generated-audio-element';

/** A derived Svelte store containing an HTMLAudioElement or undefined. */
export const audio_element: Readable<HTMLAudioElement | null> = derived(
	[audio_state],

	([$audio_state], set) => {
		// If not in a browser environment, return early.
		if (!BROWSER) {
			set(null);
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
		}

		// If a new HTMLAudioElement was created, append it to the body.
		if (!found) document.body.appendChild(el);

		// Define a function to set the HTMLAudioElement and call it.
		const handle_update = () => {
			set(el);
		};

		handle_update();
		announce.info('Setting audio element');

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
	null as HTMLAudioElement | null,
);

/**
 * Use audio element
 * @param  action - Action being performed
 */
export const use_audio_element = (action: string): HTMLAudioElement => {
	const el = get(audio_element);
	if (!el) {
		throw announce.error(`could not ${action} :: no audio element found`);
	}
	return el;
};
