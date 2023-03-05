<script lang="ts">
	import { episode_audio, episode_progress } from '$lib/audio';
	import PlaybackRate from '$lib/components/mini/playback-rate.svelte';
	import Timeline from '$lib/components/mini/timeline.svelte';
	import Timestamp from '$lib/components/mini/timestamp.svelte';
	import { Pause, Play } from '@inqling/svelte-icons/heroicon-20-solid';

	type WithElement = {
		duration: boolean;
		current_time: boolean;
		playback_rate: boolean;
		timeline: boolean;
	};

	const default_options = {
		duration: false,
		current_time: false,
		playback_rate: false,
		timeline: false,
	} satisfies WithElement;

	export let include: Partial<WithElement> = {};
	$: options = { ...default_options, ...include };

	$: is_playing = $episode_audio?.is_paused === false;

	$: current_time = options.current_time && ($episode_progress?.current_time || 0);
	$: duration = options.duration && ($episode_audio?.duration || 0);
</script>

<div class="svpod--container svpod--reset">
	<!-- toggle play -->
	<button on:click={() => episode_audio.play('toggle')} class="svpod--reset" type="button">
		<svelte:component this={is_playing ? Pause : Play} />
		<span class="svpod--a11y-hidden">
			{#if is_playing}Pause{:else}Play{/if}
		</span>
	</button>

	{#if current_time !== false}
		<Timestamp value={current_time} />
	{/if}
	{#if options.timeline}
		<Timeline />
	{/if}
	{#if duration !== false}
		<Timestamp value={duration} />
	{/if}
	{#if options.playback_rate}
		<PlaybackRate />
	{/if}
</div>

<style>
	.svpod--container {
		--fg: var(--svpod--fg-base);
		--bg: var(--svpod--bg-base);

		--svpod--timeline-track--shape--height: 3em;
		--svpod--timeline-track--shape--radius: 0.25em;
		--svpod--timeline-track--shape--border: 0;

		--svpod--timeline-thumb--shape--height: var(--svpod--timeline-track--shape--height);
		--svpod--timeline-thumb--shape--width: 3px;
		--svpod--timeline-thumb--shape--radius: 0px;
		--svpod--timeline-thumb--shape--border: 0px;

		background-color: var(--bg);
		color: var(--fg);
		display: inline-flex;
		flex-direction: row;
		font-size: 16px;
		line-height: 1em;

		min-width: 320px;
		max-width: 100%;
		border-radius: 0.4em;
		font-weight: 600;
	}

	button {
		--fg: var(--svpod--fg-base);
		align-items: center;
		background: none;
		border: none;
		color: white;
		display: flex;
		font-size: 1em;
		height: 3em;
		justify-content: center;
		width: 3em;
		cursor: pointer;
		color: var(--fg);
	}
	button:hover {
		--fg: var(--svpod--fg-base-hover);
	}
	button :global(svg) {
		width: 1.5em;
		height: 1.5em;
	}
</style>
