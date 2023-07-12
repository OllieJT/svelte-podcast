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
