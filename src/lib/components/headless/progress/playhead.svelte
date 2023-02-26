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
