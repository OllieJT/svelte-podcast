<script lang="ts">
	import AudioA11yProgress from '$lib/components/audio-a11y-progress.svelte';
	import { createEventDispatcher } from 'svelte';
	import { usePlayer, type PlayerElement } from './audio';

	// TODO: Abstract to a store so we can add actions like reqind 20s

	export let src: string;
	export let autoplay: boolean;

	export let currentTime = 0;
	export let muted = false;
	export let paused = true;
	export let playbackRate = 1;
	export let volume = 0;

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

	let duration = 0;
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
		on:timeupdate={() => dispatch('progress', { currentTime })}
		on:playing={() => dispatch('playing')}
		on:pause={() => dispatch('paused', { currentTime })}
		on:ratechange={() => dispatch('rateChange', { playbackRate })}
		on:ended={() => dispatch('finished')}
		on:seeked={() => dispatch('seek', { currentTime })}
		on:durationchange={() => console.log('durationchange')}
		on:loadeddata={() => console.log('loaded data')}
		on:loadedmetadata={() => console.log('loadedmetadata')}
		on:loadstart={() => console.log('load start')}
		on:seeking={() => console.log('seeking')}
		on:suspend={() => console.log('suspend')}
		on:volumechange={() => console.log('volumechange')}
		on:play={() => console.log('play')}
		on:canplay={() => console.log('canplay')}
		on:canplaythrough={() => console.log('canplaythrough')}
		on:waiting={() => console.log('waiting')}
		on:stalled={(e) => console.log('stalled', e)}
		on:emptied={(e) => console.log('emptied', e)}
		on:load={(e) => console.log('load', e)}
	/>
	<AudioA11yProgress {currentTime} {paused} {duration} />
	<slot {duration} />
{/key}
