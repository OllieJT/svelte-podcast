<script lang="ts">
	import { episode_audio, episode_progress } from '../audio';
	import { info } from '../utility/package/log';

	export let step = 10;

	let was_paused = true;

	function handle_drag_start(t: string) {
		info('drag_start :: ', t);
		was_paused = $episode_audio?.is_paused || true;
		episode_audio.pause();
	}

	function handle_drag_end(t: string) {
		info('drag_end :: ', t);
		if (was_paused) return;
		else episode_audio.play();
	}
</script>

<style>
	input[type='range'] {
		--track--shape--height: calc(var(--svpod--timeline-track--shape--height));
		--thumb-border-offset: calc(var(--svpod--timeline-thumb--shape--border) * 2);
		--thumb--shape--height: calc(
			var(--svpod--timeline-thumb--shape--height) - var(--thumb-border-offset)
		);

		--svpod--timeline-track--bg: var(--svpod--surface--base);
		--svpod--timeline-track--border: var(--bg);

		--svpod--timeline-thumb--bg: var(--svpod--content--base);
		--svpod--timeline-thumb--border: var(--bg);

		font-size: 1em;

		--borders: calc(var(--svpod--timeline-thumb--shape--border) * 2);
		--no-shadow: 0px 0px 0px transparent;

		height: calc(var(--thumb--shape--height) + var(--borders));
		appearance: none;
		margin: 0;
		width: 100%;
		background: transparent;
	}
	input[type='range']:hover {
		--svpod--timeline-track--bg: var(--svpod--accent--darker);
		--svpod--timeline-track--border: var(--svpod--accent--base);
		--svpod--timeline-thumb--bg: var(--svpod--accent--lighter);
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: var(--track--shape--height);
		cursor: pointer;
		animate: 0.2s;
		box-shadow: var(--no-shadow);
		background: var(--svpod--timeline-track--bg);
		border-radius: var(--svpod--timeline-track--shape--radius);
		border: var(--svpod--timeline-track--shape--border) solid var(--svpod--timeline-track--border);
	}
	input[type='range']::-webkit-slider-thumb {
		--offset: calc(var(--svpod--timeline-track--shape--border) * -1);
		box-shadow: var(--no-shadow);
		border: var(--svpod--timeline-thumb--shape--border) solid var(--svpod--timeline-thumb--border);
		height: var(--thumb--shape--height);
		width: var(--svpod--timeline-thumb--shape--width);
		border-radius: var(--svpod--timeline-thumb--shape--radius);
		background: var(--svpod--timeline-thumb--bg);
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: var(--offset);
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: var(--svpod--timeline-track--bg);
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: var(--track--shape--height);
		cursor: pointer;
		animate: 0.2s;
		box-shadow: var(--no-shadow);
		background: var(--svpod--timeline-track--bg);
		border-radius: var(--svpod--timeline-track--shape--radius);
		border: var(--svpod--timeline-track--shape--border) solid var(--svpod--timeline-track--border);
	}
	input[type='range']::-moz-range-thumb {
		box-shadow: var(--no-shadow);
		border: var(--svpod--timeline-thumb--shape--border) solid var(--svpod--timeline-thumb--border);
		height: var(--thumb--shape--height);
		width: var(--svpod--timeline-thumb--shape--width);
		border-radius: var(--svpod--timeline-thumb--shape--radius);
		background: var(--svpod--timeline-thumb--bg);
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: var(--track--shape--height);
		cursor: pointer;
		animate: 0.2s;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower,
	input[type='range']::-ms-fill-upper {
		background: var(--svpod--timeline-track--bg);
		border: var(--svpod--timeline-track--shape--border) solid var(--svpod--timeline-track--border);
		border-radius: calc(var(--svpod--timeline-track--shape--radius) * 2);
		box-shadow: var(--no-shadow);
	}
	input[type='range']::-ms-thumb {
		margin-top: 1px;
		box-shadow: var(--no-shadow);
		border: var(--svpod--timeline-thumb--shape--border) solid var(--svpod--timeline-thumb--border);
		height: var(--thumb--shape--height);
		width: var(--svpod--timeline-thumb--shape--width);
		border-radius: var(--svpod--timeline-thumb--shape--radius);
		background: var(--svpod--timeline-thumb--bg);
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower,
	input[type='range']:focus::-ms-fill-upper {
		background: var(--svpod--timeline-track--bg);
	}
</style>

<input
	class={$$props.class}
	style="display:block; width:100%;"
	type="range"
	data-paused={$episode_audio?.is_paused ? 'true' : 'false'}
	min={0}
	{step}
	max={$episode_audio?.duration || step}
	value={$episode_progress.current_time}
	on:change={(e) => episode_audio.seek(e.currentTarget.valueAsNumber)}
	on:touchstart={() => handle_drag_start('touchstart')}
	on:mousedown={() => handle_drag_start('mousedown')}
	on:touchend={() => handle_drag_end('touchend')}
	on:mouseup={() => handle_drag_end('mouseup')}
/>
