<script>
	import { episodes } from '$src/content/episodes';
	import { BROWSER } from 'esm-env';
	import { announce } from 'svelte-podcast/internal';
	import { readable } from 'svelte/store';

	/**
	 * @typedef {import('svelte/store').Readable<HTMLAudioElement | undefined>} ReadableAudioElement
	 */

	/**
	 * @typedef {(value:HTMLAudioElement) => void} SetAudioElement
	 */

	const ID = 'svpod--generated-audio-element';

	/** @type {ReadableAudioElement} */
	const el_store = readable(
		undefined,
		(/** @type {SetAudioElement} */ set) => {
			if (!BROWSER) return;

			const found = document.getElementById(ID);
			const el =
				found instanceof HTMLAudioElement
					? found
					: document.createElement('audio');

			el.id = ID;
			el.setAttribute('preload', 'metadata');
			el.muted = false;
			el.autoplay = false;
			el.controls = false;

			if (!found) document.body.appendChild(el);

			const set_element = () => {
				announce.info('setting audio element :: ', el);
				set(el);
			};

			set_element();

			el.addEventListener('loadeddata', set_element);
			el.addEventListener('pause', set_element);
			el.addEventListener('playing', set_element);

			return () => {
				// Unsubscribe by removing the element from the DOM, and cancelling the it's event listeners.
				const element = document.getElementById(ID);
				element ? element.remove() : null;

				el.removeEventListener('loadeddata', set_element);
				el.removeEventListener('pause', set_element);
				el.removeEventListener('playing', set_element);
			};
		},
	);

	$: console.log('$el_store', $el_store);
</script>

<button
	on:click={() => {
		if (!$el_store) return console.log('no element');
		const player = $el_store;
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
