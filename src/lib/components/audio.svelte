<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { usePlayer, type PlayerElement } from './audio';

	// TODO: Abstract to a store so we can add actions like reqind 20s

	export let src: string;
	export let autoplay: boolean;
	export let playbackRate: number = 1;
	export let currentTime: number = 0;
	export let paused: boolean = true;
	export let volume: number = 0;
	export let muted: boolean = false;

	let audioElement: PlayerElement;

	$: usePlayer(audioElement, 'playbackRate', playbackRate);

	const dispatch = createEventDispatcher<{ play: void; pause: void }>();

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
		controls={true}
		on:canplay={(e) => console.log('canplay')}
		on:canplaythrough={(e) => console.log('canplaythrough')}
		on:durationchange={(e) => console.log('durationchange')}
		on:ended={(e) => console.log('ended')}
		on:loadeddata={(e) => console.log('loaded data')}
		on:loadedmetadata={(e) => console.log('loadedmetadata')}
		on:loadstart={(e) => console.log('load start')}
		on:pause={(e) => console.log('pause')}
		on:play={(e) => console.log('play')}
		on:playing={(e) => console.log('playing')}
		on:ratechange={(e) => console.log('ratechange')}
		on:seeked={(e) => console.log('seeked')}
		on:seeking={(e) => console.log('seeking')}
		on:suspend={(e) => console.log('suspend')}
		on:timeupdate={(e) => console.log('timeupdate')}
		on:volumechange={(e) => console.log('volumechange')}
		on:waiting={(e) => console.log('waiting')}
		on:stalled={(e) => console.log('stalled', e)}
		on:emptied={(e) => console.log('emptied', e)}
		on:load={(e) => console.log('load', e)}
	/>
{/key}
