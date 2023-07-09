<script lang="ts">
	import { Pause, Play } from '@inqling/svelte-icons/heroicon-20-solid';
	import { clsx } from 'clsx';
	import { HeadlessTimeline } from '.';
	import { episode_audio, episode_progress } from '../audio';
	import { user_preferences } from '../user';
	import { A11yIcon, Skip, Spinner, Timestamp } from './utility';

	type WithElement = {
		duration: boolean;
		current_time: boolean;
		playback_rate: boolean;
		skip_back: number | null;
		skip_forward: number | null;
	};

	const default_options = {
		duration: false,
		current_time: false,
		playback_rate: false,
		skip_back: null,
		skip_forward: null,
	} satisfies WithElement;

	export let include: Partial<WithElement> = {};
	$: options = { ...default_options, ...include };

	$: is_playing = $episode_audio?.is_paused === false;

	$: current_time = options.current_time && ($episode_progress?.current_time || 0);
	$: duration = options.duration && ($episode_audio?.duration || 0);
	$: timestamp_hours = Boolean($episode_audio?.duration && $episode_audio.duration >= 3600);

	export let playback_rate_values: number[] = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];

	$: is_loaded = Boolean($episode_audio?.src);

	const { class: ClassName, ...rest } = $$restProps;
</script>

<div
	class={clsx('svpod--container svpod--reset', ClassName)}
	data-loaded={is_loaded ? 'true' : 'false'}
	{...rest}
>
	{#if options.skip_back}
		<button
			on:click={() => options.skip_back && episode_audio.skip(options.skip_back, 'backward')}
			class="svpod--reset svpod--toggle-pause"
			type="button"
		>
			<Skip value={options.skip_back} type="backward" />
		</button>
	{/if}

	<!-- toggle play -->
	{#if is_loaded}
		<button
			on:click={() => is_loaded && episode_audio.play('toggle')}
			class="svpod--reset svpod--toggle-pause"
			type="button"
		>
			<A11yIcon icon={is_playing ? Pause : Play} label={is_playing ? 'Pause' : 'Play'} />
		</button>
	{:else}
		<div class="svpod--reset svpod--toggle-pause">
			<A11yIcon icon={Spinner} label="Waiting for audio..." />
		</div>
	{/if}

	{#if options.skip_forward}
		<button
			on:click={() =>
				options.skip_forward && episode_audio.skip(options.skip_forward, 'forward')}
			class="svpod--reset svpod--toggle-pause"
			type="button"
		>
			<Skip value={options.skip_forward} type="forward" />
		</button>
	{/if}

	{#if current_time !== false}
		<div class="svpod--timestamp">
			<Timestamp value={current_time} force_hours={timestamp_hours} />
		</div>
	{/if}
	<div class="svpod--timeline">
		<HeadlessTimeline />
	</div>
	{#if duration !== false}
		<div class="svpod--timestamp">
			<Timestamp value={duration} />
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

	.svpod--toggle-pause {
		align-items: center;
		border: none;
		display: flex;
		font-size: 1em;
		height: 3em;
		justify-content: center;
		width: 3em;
		border-radius: var(--inner-radius);
	}
	button.svpod--toggle-pause {
		cursor: pointer;
	}
	.svpod--toggle-pause :global(svg) {
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
		text-align: center;
		padding: 0 0.1em;
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
