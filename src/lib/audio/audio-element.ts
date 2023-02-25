import { browser } from '$app/environment';
import { onMount } from 'svelte';
import { readable } from 'svelte/store';

export const audio_element = readable<HTMLAudioElement | null>(null, (set) => {
	if (!browser) return;
	const ID = 'svelte-podcast-generated-audio-element';
	onMount(() => {
		const el = document.createElement('audio');
		el.id = ID;
		el.setAttribute('preload', 'metadata');
		el.muted = false;
		el.autoplay = true;
		el.controls = true;
		document.body.appendChild(el);
		set(el);
	});

	return () => {
		const element = document.getElementById(ID);
		element ? element.remove() : null;
	};
});

export type AudioElementStore = typeof audio_element;
