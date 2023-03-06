<script lang="ts">
	import { Pause, Play, SpeakerWave } from '@inqling/svelte-icons/heroicon-20-solid';
	import { clsx } from 'clsx';
	import { HeadlessTimeline } from '.';
	import { episode_audio, episode_progress } from '../audio';
	import { user_preferences } from '../user';
	import { A11yIcon, Skip, Spinner, Timestamp } from './utility';

	type WithElement = {
		timestamps: boolean;
		playback_rate: boolean;
		skip_back: number;
		skip_forward: number;
	};

	const default_options = {
		timestamps: false,
		playback_rate: false,
		skip_back: 10,
		skip_forward: 10,
	} satisfies WithElement;

	export let include: Partial<WithElement> = {};
	$: options = { ...default_options, ...include };

	$: is_playing = $episode_audio?.is_paused === false;

	$: timestamp_hours = Boolean($episode_audio?.duration && $episode_audio.duration >= 3600);

	export let playback_rate_values: number[] = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];

	$: is_loaded = Boolean($episode_audio?.src);

	const { class: ClassName, ...rest } = $$restProps;
</script>

<style>
	.svpod--container {
		--fg: var(--svpod--content--base);
		--bg: var(--svpod--surface--darker);

		--padding: 2px;
		--radius: 0.75em;
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
		flex-direction: column;
		align-items: stretch;
		font-size: 16px;
		line-height: 1em;
		width: auto;
		max-width: 100%;
		border-radius: var(--radius);
		font-weight: 600;
		padding: var(--padding);
		gap: 0;
	}

	.svpod--container--row {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: flex-end;
		width: 100%;
		min-width: max-content;
		border-radius: var(--inner-radius);
		gap: var(--padding);
	}
	.svpod--container--row:last-child {
		border-top: 1px solid var(--svpod--surface--base);
		border-top-right-radius: 0;
		border-top-left-radius: 0;
	}

	.svpod--row--artwork {
		order: 0;
	}
	.svpod--row--timeline {
		order: 1;
	}
	.svpod--row--controls {
		order: 2;
		justify-content: center;
	}
	.svpod--row--timestamps {
		order: 3;
		min-height: 32px;
		gap: 0.5em;
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
	div.svpod--artwork {
		position: relative;
		border-radius: var(--inner-radius);
		overflow: hidden;
	}
	div.svpod--artwork > :global(div),
	div.svpod--artwork > :global(img) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.svpod--artwork--placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--svpod--accent--lighter);
		font-size: 2.5em;
	}
	.svpod--artwork--placeholder :global(svg) {
		position: relative;
		z-index: 1;
	}
	.svpod--artwork--placeholder::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		opacity: 0.5;
		background: linear-gradient(45deg, var(--svpod--accent--base), transparent);
	}

	span.svpod--aspect--square {
		display: block;
		position: relative;
		line-height: 0;
		padding-bottom: 100%;
	}
</style>

<div
	class={clsx('svpod--container svpod--reset', ClassName)}
	data-loaded={is_loaded ? 'true' : 'false'}
	{...rest}
>
	<div class="svpod--container--row svpod--row--controls">
		<button
			on:click={() => options.skip_back && episode_audio.skip(options.skip_back, 'backward')}
			class="svpod--reset svpod--toggle-pause"
			type="button"
		>
			<Skip value={options.skip_back} type="backward" />
		</button>

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

		<button
			on:click={() => options.skip_forward && episode_audio.skip(options.skip_forward, 'forward')}
			class="svpod--reset svpod--toggle-pause"
			type="button"
		>
			<Skip value={options.skip_forward} type="forward" />
		</button>
	</div>

	<div class="svpod--artwork svpod--row--artwork">
		<span class="svpod--aspect--square" />
		<slot>
			<div class="svpod--artwork--placeholder">
				<span><SpeakerWave style="width:1em; height: 1em;" /></span>
			</div>
		</slot>
	</div>

	<div class="svpod--timeline svpod--row--timeline">
		<HeadlessTimeline />
	</div>

	{#if options.timestamps || options.playback_rate}
		<div class="svpod--container--row svpod--row--timestamps">
			{#if options.timestamps}
				<div class="svpod--timestamp">
					<Timestamp value={$episode_progress?.current_time || 0} force_hours={timestamp_hours} />
				</div>

				<div style="flex-grow: 1" />

				<div class="svpod--timestamp">
					<Timestamp value={$episode_audio?.duration || 0} />
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
	{/if}
</div>
