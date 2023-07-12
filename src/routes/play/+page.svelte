<script>
	import { episodes } from '$src/content/episodes';
	import { BROWSER } from 'esm-env';
	import { user_preferences } from 'svelte-podcast';
	import { derived } from 'svelte/store';

	/**
	 * @typedef {import('svelte/store').Readable<HTMLAudioElement | undefined>} ReadableAudioElement
	 */

	/**
	 * @typedef {import('svelte-podcast').UserPreferences} Preferences
	 */

	/**
	 * @typedef { (values: [Preferences], set: (value: HTMLAudioElement) => void, update: (fn: import('svelte/store').Updater<HTMLAudioElement>) => void) => void | import('svelte/store').Unsubscriber} SetAudioElement
	 */

	const ELEMENT_ID = 'svpod--generated-audio-element';

	/** @type {ReadableAudioElement} */
	const audio_element = derived(
		[user_preferences],
		/** @type {SetAudioElement} */
		([$preferences], set) => {
			// If not in a browser environment, return early.
			if (!BROWSER) return;

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
			el.playbackRate = $preferences.playback_rate;
			el.volume = $preferences.volume;

			// If a new HTMLAudioElement was created, append it to the body.
			if (!found) document.body.appendChild(el);

			// Define a function to set the HTMLAudioElement and call it.
			set(el);

			// Add event listeners to the HTMLAudioElement to update the store when it changes.
			el.addEventListener('loadeddata', () => set(el));
			el.addEventListener('pause', () => set(el));
			el.addEventListener('playing', () => set(el));

			// Return a function to clean up the HTMLAudioElement when the store unsubscribes.
			return () => {
				// Remove the event listeners from the HTMLAudioElement.
				el.removeEventListener('loadeddata', () => set(el));
				el.removeEventListener('pause', () => set(el));
				el.removeEventListener('playing', () => set(el));

				// Remove the HTMLAudioElement from the DOM.
				el ? el.remove() : null;
			};
		},
		undefined,
	);

	$: console.log('$audio_element', $audio_element);
</script>

<button
	on:click={() => {
		if (!$audio_element) return console.log('no element');
		const player = $audio_element;
		player.controls = true;
		player.src = episodes.syntax.src;
	}}
>
	Show Audio Element
</button>

<style>
	:global(#svpod--generated-audio-element) {
		margin: auto;
		width: 50vw;
		display: block;
	}
</style>
