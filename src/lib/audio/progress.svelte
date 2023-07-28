<script>
	import clamp from 'just-clamp';
	import { announce } from '../internal';
	import { audio_attributes, audio_element } from './audio-element';

	export let step = 10;

	let was_paused = true;

	/**
	 * @param {string} t - The type of event that triggered the drag end.
	 */
	function handle_drag_start(t) {
		announce.info('drag_start :: ', t);
		was_paused = $audio_attributes.is_paused;
		$audio_element?.pause();
	}

	/**
	 * @param {string} t - The type of event that triggered the drag end.
	 */
	function handle_drag_end(t) {
		announce.info('drag_end :: ', t);
		if (was_paused) return;
		else $audio_element?.play();
	}

	/**
	 * Seek to time audio
	 * @param {number} seconds - Seconds to seek
	 * @returns {void}
	 */
	const handle_seek_to = (seconds) => {
		const el = $audio_element;
		if (!el) return;

		el.currentTime = clamp(0, el.duration, seconds);
	};
</script>

{#if $audio_attributes.is_loaded}
	<input
		class={$$restProps.class}
		style="display:block; width:100%;"
		type="range"
		data-paused={$audio_attributes.is_paused ? 'true' : 'false'}
		min={0}
		{step}
		max={$audio_attributes.duration}
		value={$audio_attributes.current_time}
		on:change={(e) => handle_seek_to(e.currentTarget.valueAsNumber)}
		on:touchstart={() => handle_drag_start('touchstart')}
		on:mousedown={() => handle_drag_start('mousedown')}
		on:touchend={() => handle_drag_end('touchend')}
		on:mouseup={() => handle_drag_end('mouseup')}
	/>
{:else}
	<input
		class={$$restProps.class}
		style="display:block; width:100%;"
		type="range"
		data-paused={true}
		min={0}
		step={1}
		max={1}
		value={0}
		disabled
		readonly
	/>
{/if}

<svelte:head>
	<style>
		:root {
			/* initial player progress colors */
			--progress-bg: rgb(0, 0, 0);
			--progress-fg: rgb(155, 155, 155);
			--progress-border: rgb(105, 105, 105);
			--progress-active-bg: rgb(55, 55, 55);
			--progress-active-fg: rgb(255, 255, 255);
			--progress-active-border: rgb(155, 155, 155);

			/* initial player progress shape */
			--progress-radius: 4px;
			--progress-thumb-width: 2px;
			--progress-height: 40px;
		}
	</style>
</svelte:head>

<style lang="postcss">
	input[type='range'] {
		--thumb-border-offset: calc(var(--thumb-border-size) * 2);
		--thumb-shape-height: calc(
			var(--progress-height) - var(--thumb-border-offset)
		);

		--track-bg: var(--progress-bg);
		--track-border-color: var(--progress-border);
		--track-border-size: 1px;
		--track-radius: var(--progress-radius);

		--thumb--bg: var(--progress-fg);
		--thumb-border-color: var(--progress-border);
		--thumb-border-size: 0px;
		--thumb--radius: var(--progress-radius);
		--thumb-width: var(--progress-thumb-width);

		font-size: 1em;

		--borders: calc(var(--thumb-border-size) * 2);

		height: calc(var(--thumb-shape-height) + var(--borders));
		appearance: none;
		margin: 0;
		width: 100%;
		background: transparent;
		outline: 1px solid transparent;

		&:hover {
			--track-bg: var(--progress-active-bg);
			--track-border-color: var(--progress-active-border);
			--thumb--bg: var(--progress-active-fg);
			--thumb-border-color: var(--progress-active-border);
		}

		&:focus {
			outline-color: var(--progress-active-fg);
			--track-border-color: var(--progress-active-fg);
			--thumb--bg: var(--progress-active-fg);
			--thumb-border-color: var(--progress-active-fg);

			&::-webkit-slider-runnable-track,
			&::-ms-fill-lower,
			&::-ms-fill-upper {
				background: var(--track-bg);
			}
		}
	}

	/* webkit */
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: var(--progress-height);
		cursor: pointer;
		animate: 0.2s;
		box-shadow: none;
		background: var(--track-bg);
		border-radius: var(--track-radius);
		border: var(--track-border-size) solid var(--track-border-color);
	}
	input[type='range']::-webkit-slider-thumb {
		--offset: calc(var(--track-border-size) * -1);
		box-shadow: none;
		border: var(--thumb-border-size) solid var(--thumb-border-color);
		height: var(--thumb-shape-height);
		width: var(--thumb-width);
		border-radius: var(--thumb-radius);
		background: var(--thumb--bg);
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: var(--offset);
	}

	/* mozilla */
	input[type='range']::-moz-range-track {
		width: 100%;
		height: var(--progress-height);
		cursor: pointer;
		animate: 0.2s;
		box-shadow: none;
		background: var(--track-bg);
		border-radius: var(--track-radius);
		border: var(--track-border-size) solid var(--track-border-color);
	}
	input[type='range']::-moz-range-thumb {
		box-shadow: none;
		border: var(--thumb-border-size) solid var(--thumb-border-color);
		height: var(--thumb-shape-height);
		width: var(--thumb-width);
		border-radius: var(--thumb-radius);
		background: var(--thumb--bg);
		cursor: pointer;
	}

	/* internet explorer */
	input[type='range']::-ms-track {
		width: 100%;
		height: var(--progress-height);
		cursor: pointer;
		animate: 0.2s;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower,
	input[type='range']::-ms-fill-upper {
		background: var(--track-bg);
		border: var(--track-border-size) solid var(--track-border-color);
		border-radius: calc(var(--track-radius) * 2);
		box-shadow: none;
	}
	input[type='range']::-ms-thumb {
		margin-top: 1px;
		box-shadow: none;
		border: var(--thumb-border-size) solid var(--thumb-border-color);
		height: var(--thumb-shape-height);
		width: var(--thumb-width);
		border-radius: var(--thumb-radius);
		background: var(--thumb--bg);
		cursor: pointer;
	}
</style>
