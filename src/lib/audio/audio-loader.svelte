<script lang="ts">
	import { audio_element } from '$lib/audio/audio-element';
	import { user_preferences } from '$lib/user';
	import { info, warn } from '$lib/utility/package/log';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	$: $audio_element;
	/* onMount(() => {
	return audio_element.subscribe((el) => {
		if (el) info('mounted audio element :: ', el);
	});
}); */

	onMount(() => {
		return user_preferences.subscribe((prefs) => {
			const el = get(audio_element);
			if (!el) return warn('no audio element found');
			info('setting preferences :: ', prefs);
			el.volume = prefs.volume;
			el.playbackRate = prefs.playback_rate;
		});
	});
</script>

<svelte:head>
	<style>
		.svelte-podcast-a11y-hidden {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border: 0;
		}
	</style>
</svelte:head>
