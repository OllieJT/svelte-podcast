import { browser } from '$app/environment';
import { onMount } from 'svelte';
import { get, readable } from 'svelte/store';
import { user_preferences } from '../user';

export const audio_element = readable<HTMLAudioElement | null>(null, (set) => {
	if (!browser) return;
	const ID = 'svpod--generated-audio-element';

	onMount(() => {
		const existing_element = document.getElementById(ID) as HTMLAudioElement | null;
		const el = existing_element || document.createElement('audio');

		el.id = ID;
		el.setAttribute('preload', 'metadata');
		el.muted = false;
		el.autoplay = false;
		el.controls = false;

		const preferences = get(user_preferences);
		el.playbackRate = preferences.playback_rate;
		el.volume = preferences.volume;

		if (!existing_element) document.body.appendChild(el);
		set(el);
	});

	return () => {
		const element = document.getElementById(ID);
		element ? element.remove() : null;
	};
});
