<script lang="ts">
	import {
		__internal_audio_current_time,
		__internal_audio_element,
		__internal_audio_metadata,
		__internal_audio_src,
	} from '$lib/components/audio/store';
	import type { PlayerElement } from '$lib/components/audio/types';

	let element: PlayerElement;
	let currentTime = 0;
	let muted = false;

	$: src = $__internal_audio_src;
	$: __internal_audio_element.set(element);
	$: __internal_audio_current_time.set(currentTime);
	$: __internal_audio_metadata.update((x) => ({ ...x, muted }));
</script>

{#if src}
	<audio
		bind:this={element}
		{src}
		autoplay={false}
		bind:currentTime
		bind:muted
		preload="metadata"
		controls={false}
		on:canplay={(e) => false && console.log('canplay', e)}
		on:canplaythrough={(e) => false && console.log('canplaythrough', e)}
		on:timeupdate={(e) => false && console.log('progress', e)}
		on:loadedmetadata={(e) => false && console.log('loadedmetadata', e)}
		on:suspend={(e) => false && console.log('suspend', e)}
		on:seeked={(e) => false && console.log('seeked', e)}
		on:play={(e) => false && console.log('play', e)}
		on:waiting={(e) => console.log('waiting', e)}
		on:stalled={(e) => console.log('stalled', e)}
		on:load={(e) => console.log('load', e)}
		on:emptied={(e) => {
			// TODO: reset player state
			// console.log('emptied', e);
		}}
		aria-activedescendant="audio-progress"
		aria-atomic="true"
		aria-busy="false"
		aria-controls="audio-progress"
		on:loadeddata={() => {
			__internal_audio_metadata.update((m) => ({ ...m, loading: false }));
		}}
		on:loadstart={() => {
			__internal_audio_metadata.update((m) => ({ ...m, loading: true }));
		}}
		on:ratechange={(e) => {
			// @ts-expect-error
			const rate = e.target.playbackRate;
			console.log('rateChange', rate);
			if (typeof rate != 'number' || isNaN(rate)) return;
			__internal_audio_metadata.update((m) => ({ ...m, playbackRate: rate }));
		}}
		on:playing={(e) => {
			// @ts-expect-error
			const is_paused = e.target.paused;
			console.log('playing paused:', is_paused);
			if (typeof is_paused != 'boolean') return;
			__internal_audio_metadata.update((m) => ({ ...m, paused: is_paused }));
		}}
		on:pause={(e) => {
			// @ts-expect-error
			const is_paused = e.target.paused;
			console.log('pause paused:', is_paused);
			if (typeof is_paused != 'boolean') return;
			__internal_audio_metadata.update((m) => ({ ...m, paused: is_paused }));
		}}
		on:durationchange={(e) => {
			// @ts-expect-error
			const dur = e.target?.duration;
			console.log('durationchange', dur);
			if (typeof dur != 'number' || isNaN(dur)) return;
			__internal_audio_metadata.update((m) => ({ ...m, duration: dur }));
		}}
	/>
	<!-- <AudioA11yProgress {currentTime} {paused} {duration} /> -->
{/if}
