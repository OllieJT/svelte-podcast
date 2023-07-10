/**
 * @typedef {Object} UserPreferences
 * @property {number} playback_rate - The playback rate of the audio element.
 * @property {number} volume - The volume of the audio element.
 */
import { BROWSER } from 'esm-env';
import { onMount } from 'svelte';
import { get, readable } from 'svelte/store';
import { user_preferences } from '../../user';

/**
 * A readable store that provides an HTMLAudioElement instance.
 * @type {import('svelte/store').Readable<HTMLAudioElement | undefined>}
 * @exports audio_element
 */
export const audio_element = readable(undefined, (set) => {
	if (!BROWSER) return;
	const ID = 'svpod--generated-audio-element';

	onMount(() => {
		const existing_element = document.getElementById(ID);

		/** @type {HTMLAudioElement} */
		const el =
			existing_element instanceof HTMLAudioElement
				? existing_element
				: document.createElement('audio');

		el.id = ID;
		el.setAttribute('preload', 'metadata');
		el.muted = false;
		el.autoplay = false;
		el.controls = false;

		/** @type {UserPreferences} */
		const preferences = get(user_preferences);
		el.playbackRate = preferences.playback_rate;
		el.volume = preferences.volume;

		if (!existing_element) document.body.appendChild(el);

		// @ts-expect-error - I'm not sure how to fix this using JSDOC
		set(el);
	});

	return () => {
		const element = document.getElementById(ID);
		element ? element.remove() : null;
	};
});
