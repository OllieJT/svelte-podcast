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
	input {
		--svpod--timeline-track--bg: #ffff00;
		--svpod--timeline-track--border: #ff0808;

		--svpod--timeline-track--shape--height: 16px;
		--svpod--timeline-track--shape--radius: 50px;
		--svpod--timeline-track--shape--border: 1px;

		--svpod--timeline-thumb--shape--width: 20px;
		--svpod--timeline-thumb--shape--height: 30px;
		--svpod--timeline-thumb--shape--radius: 5px;
		--svpod--timeline-thumb--shape--border: 1px;
		--svpod--timeline-thumb--bg: #dd00ff;
		--svpod--timeline-thumb--border: #00ffee;

		--borders: calc(var(--svpod--timeline-thumb--shape--border) * 2);
		height: calc(var(--svpod--timeline-thumb--shape--height) + var(--borders));
		appearance: none;
		margin: 0;
		width: 100%;
		background: transparent;
		display: block;
	}
	input:focus {
		outline: none;
	}

	/* track */
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: var(--svpod--timeline-track--shape--height);
		cursor: pointer;
		animate: 0.2s;
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: var(--svpod--timeline-track--shape--height);
		cursor: pointer;
		animate: 0.2s;
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
	input[type='range']::-webkit-slider-runnable-track,
	input[type='range']::-moz-range-track {
		border-radius: var(--svpod--timeline-track--shape--radius);
	}
	input[type='range']::-ms-fill-lower,
	input[type='range']::-ms-fill-upper {
		border-radius: calc(var(--svpod--timeline-track--shape--radius) * 2);
	}

	input[type='range']::-webkit-slider-runnable-track,
	input[type='range']::-moz-range-track,
	input[type='range']::-ms-fill-lower,
	input[type='range']::-ms-fill-upper {
		border: var(--svpod--timeline-track--shape--border) solid var(--svpod--timeline-track--border);
		box-shadow: 0px 0px 0px #000000;
	}
	input[type='range']::-webkit-slider-runnable-track,
	input[type='range']::-moz-range-track,
	input[type='range']::-ms-fill-lower,
	input[type='range']::-ms-fill-upper,
	input:focus::-webkit-slider-runnable-track,
	input:focus::-ms-fill-lower,
	input:focus::-ms-fill-upper {
		background: var(--svpod--timeline-track--bg);
	}

	/* thumb */
	input[type='range']::-ms-thumb,
	input[type='range']::-moz-range-thumb,
	input[type='range']::-webkit-slider-thumb {
		border: var(--svpod--timeline-thumb--shape--border) solid var(--svpod--timeline-thumb--border);
		height: var(--svpod--timeline-thumb--shape--height);
		width: var(--svpod--timeline-thumb--shape--width);
		border-radius: var(--svpod--timeline-thumb--shape--radius);
		background: var(--svpod--timeline-thumb--bg);
		box-shadow: 0px 0px 0px #000000;
		cursor: pointer;
	}
	input[type='range']::-ms-thumb {
		margin-top: 1px;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		margin-top: -8px;
	}
</style>
