<script>
	import { episode_audio, episode_progress } from '../audio';
	import { announce } from '../internal';

	export let step = 10;

	let was_paused = true;

	/**
	 * @param {string} t - The type of event that triggered the drag end.
	 */
	function handle_drag_start(t) {
		announce.info('drag_start :: ', t);
		was_paused = $episode_audio?.is_paused || true;
		episode_audio.pause();
	}

	/**
	 * @param {string} t - The type of event that triggered the drag end.
	 */
	function handle_drag_end(t) {
		announce.info('drag_end :: ', t);
		if (was_paused) return;
		else episode_audio.play();
	}
</script>

{#if $episode_audio && $episode_progress}
	<input
		class={$$restProps.class}
		style="display:block; width:100%;"
		type="range"
		data-paused={$episode_audio.is_paused ? 'true' : 'false'}
		min={0}
		{step}
		max={$episode_audio.duration || step}
		value={$episode_progress.current_time}
		on:change={(e) => episode_audio.seek(e.currentTarget.valueAsNumber)}
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
