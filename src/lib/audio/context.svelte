<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { announce } from '../internal';
	import { user_preferences } from '../user';
	import { audio_element } from './stores/audio-element';

	$: $audio_element;

	onMount(() => {
		return user_preferences.subscribe((prefs) => {
			const el = get(audio_element);

			if (!el) return announce.warn('no audio element found');

			announce.info('setting preferences :: ', prefs);
			el.volume = prefs.volume;
			el.playbackRate = prefs.playback_rate;
		});
	});
</script>
