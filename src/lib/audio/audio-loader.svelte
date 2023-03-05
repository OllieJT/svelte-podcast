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
			--svpod--font: sans-serif;

			--svpod--surface--darker: rgb(0, 0, 0);
			--svpod--surface--base: rgb(40, 40, 40);
			--svpod--surface--lighter: rgb(60, 60, 60);

			--svpod--content--darker: rgb(150, 150, 150);
			--svpod--content--base: rgb(200, 200, 200);
			--svpod--content--lighter: rgb(255, 255, 255);

			--svpod--accent--darker: rgb(75, 15, 0);
			--svpod--accent--base: rgb(180, 40, 0);
			--svpod--accent--lighter: rgb(255, 55, 25);

			--bg: var(--svpod--surface--darker);
			--fg: var(--svpod--content--darker);

			--svpod--radius--rounded: 9999px;

			/* element : timeline */

			--svpod--timeline-track--shape--height: 20px;
			--svpod--timeline-track--shape--radius: 0;
			--svpod--timeline-track--shape--border: 0;

			--svpod--timeline-thumb--shape--width: 8px;
			--svpod--timeline-thumb--shape--height: 32px;
			--svpod--timeline-thumb--shape--radius: 6px;
			--svpod--timeline-thumb--shape--border: 2px;
		}

		.svpod--reset {
			text-transform: none;
			font-style: normal;
			text-indent: 0;
			text-shadow: none;
			text-align: left;
			margin: 0;
			padding: 0;
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

		.svpod--button,
		.svpod--icon-button {
			--fg: var(--svpod--content--base);
			--bg: var(--svpod--surface--base);
			position: relative;
			line-height: 1em;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			font-size: 16px;
			border: 0px solid transparent;
			border-radius: var(--svpod--radius--rounded);
			background-color: var(--bg);
			color: var(--fg);
			cursor: pointer;
		}
		.svpod--button:hover,
		.svpod--icon-button:hover {
			--fg: var(--svpod--content--lighter);
			--bg: var(--svpod--surface--lighter);
		}

		.svpod--button {
			padding: 4px calc(1em);
		}

		.svpod--icon-button {
			padding: 8px;
			min-width: 48px;
			min-height: 48px;
		}
	</style>
</svelte:head>
