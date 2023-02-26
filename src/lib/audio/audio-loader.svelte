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
		:root {
			--svpod--bg-base: rgb(0, 0, 0);

			--svpod--bg-surface: rgb(30, 30, 30);
			--svpod--bg-surface-hover: rgb(50, 50, 50);

			--svpod--fg-base: rgb(200, 200, 200);
			--svpod--fg-base-hover: rgb(255, 255, 255);

			/* --svpod--fg-accent: rgb(0, 50, 200); */
			/* --svpod--fg-accent-hover: rgb(0, 100, 255); */
		}

		.svpod--a11y-hidden {
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

		.svpod--rounded {
			border-radius: 9999px;
		}
		.svpod--icon-button {
			--fg: var(--svpod--fg-base);
			--bg: var(--svpod--bg-surface);
			position: relative;
			line-height: 1em;
			padding: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 48px;
			min-height: 48px;
			gap: 8px;
			font-size: 16px;
			border: 0px solid transparent;
			background-color: var(--bg);
			color: var(--fg);
			cursor: pointer;
		}
		.svpod--icon-button:hover {
			--fg: var(--svpod--fg-base-hover);
			--bg: var(--svpod--bg-surface-hover);
		}
	</style>
</svelte:head>
