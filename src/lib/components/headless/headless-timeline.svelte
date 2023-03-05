<script lang="ts">
	import { episode_audio, episode_progress } from '$lib';

	let current_time = 0;
	$: current_time = $episode_progress.current_time;
</script>

<input
	class={$$props.class}
	style="display:block; width:100%;"
	type="range"
	data-paused={$episode_audio?.is_paused ? 'true' : 'false'}
	min={0}
	step={10}
	max={$episode_audio?.duration}
	value={$episode_progress.current_time}
	on:change={(e) => episode_audio.seek(e.currentTarget.valueAsNumber)}
	on:touchstart={() => console.log('touchstart')}
	on:touchend={() => console.log('touchend')}
	on:drag={() => console.log('drag')}
	on:dragstart={() => console.log('dragstart')}
	on:focus={() => console.log('focus')}
	on:blur={() => console.log('blur')}
	on:focusin={(e) => {
		console.log('focusin');
		episode_audio.pause();
		// e.currentTarget.blur();
	}}
	on:focusout={() => {
		console.log('focusout');
		// episode_audio.play();
	}}
/>

<style>
	input[type='range'] {
		--borders: calc(var(--svpod--timeline-thumb--shape--border) * 2);
		--no-shadow: 0px 0px 0px transparent;

		height: calc(var(--svpod--timeline-thumb--shape--height) + var(--borders));
		appearance: none;
		margin: 0;
		width: 100%;
		background: transparent;
	}
	input[type='range']:hover {
		--svpod--timeline-thumb--bg: var(--svpod--fg-accent-hover);
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: var(--svpod--timeline-track--shape--height);
		cursor: pointer;
		animate: 0.2s;
		box-shadow: var(--no-shadow);
		background: var(--svpod--timeline-track--bg);
		border-radius: var(--svpod--timeline-track--shape--radius);
		border: var(--svpod--timeline-track--shape--border) solid var(--svpod--timeline-track--border);
	}
	input[type='range']::-webkit-slider-thumb {
		--offset: calc(
			calc(
					var(--svpod--timeline-track--shape--height) - var(--svpod--timeline-thumb--shape--height)
				) / 2
		);
		box-shadow: var(--no-shadow);
		border: var(--svpod--timeline-thumb--shape--border) solid var(--svpod--timeline-thumb--border);
		height: var(--svpod--timeline-thumb--shape--height);
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
		height: var(--svpod--timeline-track--shape--height);
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
		height: var(--svpod--timeline-thumb--shape--height);
		width: var(--svpod--timeline-thumb--shape--width);
		border-radius: var(--svpod--timeline-thumb--shape--radius);
		background: var(--svpod--timeline-thumb--bg);
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: var(--svpod--timeline-track--shape--height);
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
		height: var(--svpod--timeline-thumb--shape--height);
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
