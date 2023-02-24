<script lang="ts">
	import {
		audio_current_time,
		audio_element,
		audio_metadata,
		audio_src,
	} from '$lib/context/audio-internals';
	import type { PlayerElement } from '$lib/types/types';
	import { isBoolean, isNumber } from '$pkg/type-guards';

	let element: PlayerElement;
	let currentTime = 0;
	let muted = false;

	$: src = $audio_src;
	$: audio_element.set(element);
	$: audio_current_time.set(currentTime);
	$: audio_metadata.update((x) => ({ ...x, muted }));
</script>

{#key src}
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
		on:emptied={() => {
			// TODO: reset player state
			// console.log('emptied', e);
		}}
		on:loadeddata={() => {
			audio_metadata.update((m) => ({ ...m, loading: false }));
		}}
		on:loadstart={() => {
			audio_metadata.update((m) => ({ ...m, loading: true }));
		}}
		on:playing={(e) => {
			// @ts-expect-error event is not fully typed
			const is_paused = e.target.paused;
			if (!isBoolean(is_paused)) return;
			audio_metadata.update((m) => ({ ...m, paused: is_paused }));
		}}
		on:pause={(e) => {
			// @ts-expect-error event is not fully typed
			const is_paused = e.target.paused;
			if (!isBoolean(is_paused)) return;
			audio_metadata.update((m) => ({ ...m, paused: is_paused }));
		}}
		on:ratechange={(e) => {
			// @ts-expect-error event is not fully typed
			const playbackRate = e.target.playbackRate;
			if (!isNumber(playbackRate)) return;
			audio_metadata.update((m) => ({ ...m, playbackRate }));
		}}
		on:durationchange={(e) => {
			// @ts-expect-error event is not fully typed
			const duration = e.target?.duration;
			if (!isNumber(duration)) return;
			audio_metadata.update((m) => ({ ...m, duration }));
		}}
	/>
{/key}
