<script lang="ts">
	import { usePlayer, type PlayerElement } from '$lib/components/audio/helper';
	import {
		_currentTime,
		_duration,
		_muted,
		_paused,
		_playbackRate,
		_seek,
		_src,
		_volume,
	} from '$lib/components/audio/state';

	export let autoplay: boolean;
	let audioElement: PlayerElement;

	let currentTime = 0;
	let paused = true;
	let playbackRate = 1;
	let muted = false;
	let volume = 0;
	let duration = 0;

	$: usePlayer(audioElement, 'playbackRate', playbackRate);

	function handleSeek(value: number) {
		if (value < 0) return;
		if (value > duration) return;
		currentTime = value;
	}

	$: _currentTime.set(currentTime);
	$: _duration.set(duration);
	$: _paused.set(paused);

	$: handleSeek($_seek);

	$: volume = $_volume;
	$: muted = $_muted;
	$: playbackRate = $_playbackRate;
	$: paused = $_paused;
</script>

{#key $_src}
	{#if $_src}
		<audio
			bind:this={audioElement}
			src={$_src}
			{autoplay}
			bind:currentTime
			bind:duration
			bind:paused
			bind:muted
			bind:volume
			preload="metadata"
			controls={false}
			on:seeked={() => _seek.set(-1)}
			on:timeupdate={() => console.log('progress', { currentTime })}
			on:ratechange={() => console.log('rateChange', { playbackRate })}
			on:ended={() => console.log('finished')}
			on:playing={() => console.log('playing')}
			on:pause={() => console.log('pause')}
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
		<!-- <AudioA11yProgress {currentTime} {paused} {duration} /> -->
	{/if}\
{/key}
