<script lang="ts">
	import { episode_audio, episode_progress } from '$lib/audio';
	import { A11yIcon, HeadlessTimeline } from '$lib/components/utility';
	import { user_preferences } from '$lib/user';
	import { secondsToTimestamp } from '$lib/utility';
	import { Pause, Play } from '@inqling/svelte-icons/heroicon-20-solid';
	import { clsx } from 'clsx';

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

	export let playback_rate_values: number[] = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];

	const { class: ClassName, ...rest } = $$restProps;
</script>

<div class={clsx('svpod--container svpod--reset', ClassName)} {...rest}>
	<!-- toggle play -->
	<button
		on:click={() => episode_audio.play('toggle')}
		class="svpod--reset svpod--toggle-pause"
		type="button"
	>
		<A11yIcon icon={is_playing ? Pause : Play} label={is_playing ? 'Pause' : 'Play'} />
	</button>

	{#if current_time !== false}
		<div class="svpod--timestamp">
			<span>{secondsToTimestamp(current_time)}</span>
		</div>
	{/if}
	<div class="svpod--timeline">
		<HeadlessTimeline />
	</div>
	{#if duration !== false}
		<div class="svpod--timestamp">
			<span>{secondsToTimestamp(duration)}</span>
		</div>
	{/if}
	{#if options.playback_rate}
		<select
			class="svpod--playback-rate"
			value={$user_preferences.playback_rate}
			on:change={(e) => {
				const value = parseFloat(e.currentTarget.value);
				user_preferences.set.playback_rate(value);
			}}
		>
			{#each playback_rate_values as value}
				<option {value}>
					{#if Number.isInteger(value)}
						{value}.0
					{:else}
						{value}
					{/if}
				</option>
			{/each}
		</select>
	{/if}
</div>

<style>
	.svpod--container {
		--fg: var(--svpod--content--base);
		--bg: var(--svpod--surface--darker);

		--padding: 2px;
		--radius: 0.5em;
		--inner-radius: calc(var(--radius) - var(--padding));

		--svpod--timeline-track--shape--height: 3em;
		--svpod--timeline-track--shape--radius: var(--inner-radius);
		--svpod--timeline-track--shape--border: 2px;

		--svpod--timeline-thumb--shape--height: var(--svpod--timeline-track--shape--height);
		--svpod--timeline-thumb--shape--width: 3px;
		--svpod--timeline-thumb--shape--radius: 1px;
		--svpod--timeline-thumb--shape--border: 0px;

		background-color: var(--bg);
		color: var(--fg);
		display: inline-flex;
		flex-direction: row;
		align-items: stretch;
		font-size: 16px;
		line-height: 1em;
		min-width: 320px;
		max-width: 100%;
		border-radius: var(--radius);
		font-weight: 600;
		padding: var(--padding);
		gap: var(--padding);
	}

	div.svpod--timeline {
		display: flex;
		align-items: center;
		justify-content: stretch;
		flex-grow: 1;
		flex-shrink: 1;
		font-size: 1em;
		background: none;
	}

	button.svpod--toggle-pause {
		align-items: center;
		border: none;
		display: flex;
		font-size: 1em;
		height: 3em;
		justify-content: center;
		width: 3em;
		cursor: pointer;
		border-radius: var(--inner-radius);
	}
	button.svpod--toggle-pause :global(svg) {
		width: 1.5em;
		height: 1.5em;
	}

	div.svpod--timestamp {
		background-color: var(--bg);
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 4px;
		font-size: 1em;
		line-height: 1em;
		pointer-events: none;
		border-radius: var(--inner-radius);
		width: max-content;
		flex-grow: 0;
	}
	div.svpod--timestamp span {
		letter-spacing: 0.5px;
		font-size: 0.8em;
		display: block;
		width: 8ch;
	}

	select.svpod--playback-rate {
		background-color: var(--bg);
		appearance: none;
		padding: 0 0.75em;
		color: var(--fg);
		overflow: hidden;
		letter-spacing: 0.5px;
		font-size: 0.8em;
		line-height: 1em;
		text-transform: uppercase;
		font-weight: 600;
		text-align: center;
		min-width: 48px;
		outline-color: var(--svpod--accent--lighter);
		cursor: pointer;
		margin: 0;
		border-radius: var(--inner-radius);
	}
	select.svpod--playback-rate,
	select.svpod--playback-rate:hover,
	select.svpod--playback-rate:focus {
		border: none;
		shadow: none;
	}
	select.svpod--playback-rate:focus {
		--fg: var(--svpod--accent--lighter);
	}

	button.svpod--toggle-pause,
	select.svpod--playback-rate {
		background-color: var(--bg);
		color: var(--fg);
	}
	button.svpod--toggle-pause:hover,
	select.svpod--playback-rate:hover {
		--bg: var(--svpod--surface--base);
		--fg: var(--svpod--content--lighter);
		background-color: var(--bg);
		color: var(--fg);
	}
</style>
