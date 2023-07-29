<script lang="ts">
	import {
		LoadingSpinner,
		Pause,
		Play,
		SkipBack,
		SkipForward,
	} from '$src/components/icon';
	import { AudioPlayer, user_preferences } from 'svelte-podcast';

	export let src: string | undefined;
	export let skip_back = 30;
	export let skip_forward = 10;

	/** @type {import('svelte-podcast/core').AudioMetadata} */
	export let metadata = {};

	export let playback_rate_values = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];
</script>

<svelte:head>
	<style>
		:root {
			--svpod-surface-darker: rgb(0, 0, 0);
			--svpod-surface-base: rgb(40, 40, 40);
			--svpod-surface-lighter: rgb(60, 60, 60);

			--svpod-content-darker: rgb(150, 150, 150);
			--svpod-content-base: rgb(200, 200, 200);
			--svpod-content-lighter: rgb(255, 255, 255);

			--svpod-accent-darker: rgb(75, 15, 0);
			--svpod-accent-base: rgb(180, 40, 0);
			--svpod-accent-lighter: rgb(255, 55, 25);
		}
	</style>
</svelte:head>

<AudioPlayer {src} {metadata} let:Player let:action let:attributes>
	<div
		class="svpod-container {$$restProps.class}"
		data-loaded={attributes.is_loaded ? 'true' : 'false'}
	>
		<!-- Player Action: Skip back -->
		<button
			on:click={() => action.skip_back(skip_back)}
			class="svpod-skip"
			type="button"
			aria-label="Skip back {skip_back} seconds"
		>
			<div class="svpod-skip-label">
				<span>
					{skip_back}
				</span>
			</div>
			<div class="svpod-skip-icon">
				<SkipBack />
			</div>
		</button>

		<!-- Player Action: Toggle play / pause -->
		{#if attributes.is_loaded}
			<button
				on:click={() => action.toggle()}
				class="svpod-toggle"
				type="button"
				aria-label={attributes.is_paused ? 'Play' : 'Pause'}
			>
				<svelte:component this={attributes.is_paused ? Play : Pause} />
			</button>
		{:else}
			<div class="svpod-toggle">
				<LoadingSpinner />
				<span class="svpod--a11y">Waiting for audio...</span>
			</div>
		{/if}

		<!-- Player Action: Skip forward -->
		<button
			on:click={() => action.skip_forward(skip_forward)}
			class="svpod-skip"
			type="button"
			aria-label="Skip forward {skip_forward} seconds"
		>
			<div class="svpod-skip-label">
				<span>
					{skip_forward}
				</span>
			</div>
			<div class="svpod-skip-icon">
				<SkipForward />
			</div>
		</button>

		<!-- Player Data: Current timestamp -->
		<div class="svpod-timestamp" class:active={!attributes.is_paused}>
			<span style="width:{attributes.timestamp_end.length}ch">
				{attributes.timestamp_current}
			</span>
		</div>

		<!-- Player Component: Timeline -->
		<div class="svpod--timeline">
			<Player.Progress />
		</div>

		<!-- Player Data: Total duration timestamp -->
		<div class="svpod-timestamp">
			<span style="width:{attributes.timestamp_end.length}ch">
				{attributes.timestamp_end}
			</span>
		</div>

		<!-- Player Action: Select playback speed -->

		<select
			class="svpod-playback"
			value={$user_preferences.playback_rate}
			on:change={(e) => {
				const value = parseFloat(e.currentTarget.value);
				action.set_playback_rate(value);
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
	</div>
</AudioPlayer>

<style lang="postcss">
	* {
		/* css-reset */
		text-transform: none;
		font-style: normal;
		text-indent: 0;
		text-shadow: none;
		text-align: left;
		margin: 0;
		padding: 0;
	}
	.svpod--a11y {
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

	.svpod-container {
		--size: 48px;
		--column: var(--size);
		--row: var(--size);
		--text: calc(var(--size) / 3);

		--padding: 2px;
		--radius: 12px;
		--inner-radius: calc(var(--radius) - var(--padding));

		--bg: var(--svpod-surface-darker);
		--fg: var(--svpod-content-base);

		display: grid;
		grid-template-columns:
			var(--column)
			var(--column)
			var(--column)
			max-content
			auto
			max-content
			var(--column);
		grid-template-rows: var(--column);
		user-select: none;
		background-color: var(--bg);

		padding: var(--padding);
		gap: var(--padding);
		border-radius: var(--radius);
	}

	button,
	select {
		background-color: var(--bg);
		color: var(--fg);
		border-radius: var(--inner-radius);
		overflow: hidden;
		font-size: 0.8em;
		font-weight: 500;

		&:hover {
			--fg: var(--svpod-content-lighter);
			--bg: var(--svpod-surface-base);
		}

		&:focus {
			outline: 2px solid var(--svpod-accent-lighter);
			box-shadow: none;
		}
	}

	.svpod-skip {
		position: relative;
		display: grid;
		align-content: stretch;
		justify-content: stretch;

		.svpod-skip-icon {
			position: absolute;
			inset: 4px;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: center;

			:global(svg) {
				width: 100%;
				height: 100%;
			}
		}

		.svpod-skip-label {
			width: 100%;
			height: 100%;
			display: grid;
			place-content: center;
			z-index: 30;
			background: linear-gradient(0deg, var(--bg), transparent);

			span {
				line-height: 1em;
			}
		}
	}

	.svpod-toggle {
		--fg: var(--svpod-content-lighter);
		display: grid;
		place-content: center;

		&:hover {
			--fg: var(--svpod-accent-lighter);
			--bg: var(--svpod-accent-darker);
		}
	}

	.svpod-playback {
		appearance: none;
		background-image: none;
		margin: 0;
		text-align: center;
		text-align-last: center;
		padding: 0 0.5em;
		letter-spacing: 0.05em;
		border: none;

		&::before,
		&::after {
			content: none;
		}
	}

	.svpod-timestamp {
		display: grid;
		place-content: center;
		letter-spacing: 0.05em;
		font-size: 0.8em;
		text-align: center;
		padding: 0.25em 1em;
		color: var(--fg);
		background-color: var(--bg);
		border-radius: var(--inner-radius);
		place-self: center;

		span {
			display: inline-block;
			text-align: center;
		}

		&.active {
			--fg: var(--svpod-accent-lighter);
			--bg: var(--svpod-accent-darker);
		}
	}

	.svpod--timeline {
		display: flex;
		align-items: center;
		justify-content: stretch;
		flex-grow: 1;
		flex-shrink: 1;
		font-size: 1em;
		background: none;

		--progress-height: var(--size);

		--progress-fg: var(--svpod-content-base);
		--progress-bg: var(--svpod-surface-base);
		--progress-border: var(--svpod-surface-base);

		--progress-active-fg: var(--svpod-accent-lighter);
		--progress-active-bg: var(--svpod-accent-darker);
		--progress-active-border: var(--svpod-accent-base);
	}
</style>
