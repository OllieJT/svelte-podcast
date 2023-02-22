<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { usePlayer, type PlayerElement } from './audio';

	// TODO: Abstract to a store so we can add actions like reqind 20s

	export let src: string;
	export let autoplay: boolean;

	export let currentTime: number = 0;
	export let muted: boolean = false;
	export let paused: boolean = true;
	export let playbackRate: number = 1;
	export let volume: number = 0;

	let audioElement: PlayerElement;

	$: usePlayer(audioElement, 'playbackRate', playbackRate);

	const dispatch = createEventDispatcher<{
		playing: void;
		finished: void;
		paused: { currentTime: number };
		progress: { currentTime: number };
		seek: { currentTime: number };
		rateChange: { playbackRate: number };
	}>();

	let duration: number = 0;
</script>

{#key src}
	<audio
		bind:this={audioElement}
		{src}
		{autoplay}
		bind:currentTime
		bind:duration
		bind:paused
		bind:muted
		bind:volume
		preload="metadata"
		controls={false}
		on:timeupdate={(e) => {
			// @ts-expect-error
			const timeNow = e.target?.currentTime;
			if (typeof timeNow != 'number') return;
			dispatch('progress', { currentTime: timeNow });
		}}
		on:playing={(e) => dispatch('playing')}
		on:pause={(e) => dispatch('paused', { currentTime })}
		on:ratechange={(e) => dispatch('rateChange', { playbackRate })}
		on:ended={(e) => dispatch('finished')}
		on:seeked={(e) => dispatch('seek', { currentTime })}
		on:durationchange={(e) => console.log('durationchange')}
		on:loadeddata={(e) => console.log('loaded data')}
		on:loadedmetadata={(e) => console.log('loadedmetadata')}
		on:loadstart={(e) => console.log('load start')}
		on:seeking={(e) => console.log('seeking')}
		on:suspend={(e) => console.log('suspend')}
		on:volumechange={(e) => console.log('volumechange')}
		on:play={(e) => console.log('play')}
		on:canplay={(e) => console.log('canplay')}
		on:canplaythrough={(e) => console.log('canplaythrough')}
		on:waiting={(e) => console.log('waiting')}
		on:stalled={(e) => console.log('stalled', e)}
		on:emptied={(e) => console.log('emptied', e)}
		on:load={(e) => console.log('load', e)}
	/>
	<slot {duration} />
{/key}
