<script lang="ts">
	import {
		__internal_audio_current_time,
		__internal_audio_element,
		__internal_audio_metadata,
		__internal_audio_src,
	} from '$lib/context/audio';
	import { isBoolean, isNumber } from '$lib/types/type-guards';
	import type { PlayerElement } from '$lib/types/types';

	let element: PlayerElement;
	let currentTime = 0;
	let muted = false;

	$: src = $__internal_audio_src;
	$: __internal_audio_element.set(element);
	$: __internal_audio_current_time.set(currentTime);
	$: __internal_audio_metadata.update((x) => ({ ...x, muted }));
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
			__internal_audio_metadata.update((m) => ({ ...m, loading: false }));
		}}
		on:loadstart={() => {
			__internal_audio_metadata.update((m) => ({ ...m, loading: true }));
		}}
		on:playing={(e) => {
			// @ts-expect-error event is not fully typed
			const is_paused = e.target.paused;
			if (!isBoolean(is_paused)) return;
			__internal_audio_metadata.update((m) => ({ ...m, paused: is_paused }));
		}}
		on:pause={(e) => {
			// @ts-expect-error event is not fully typed
			const is_paused = e.target.paused;
			if (!isBoolean(is_paused)) return;
			__internal_audio_metadata.update((m) => ({ ...m, paused: is_paused }));
		}}
		on:ratechange={(e) => {
			// @ts-expect-error event is not fully typed
			const playbackRate = e.target.playbackRate;
			if (!isNumber(playbackRate)) return;
			__internal_audio_metadata.update((m) => ({ ...m, playbackRate }));
		}}
		on:durationchange={(e) => {
			// @ts-expect-error event is not fully typed
			const duration = e.target?.duration;
			if (!isNumber(duration)) return;
			__internal_audio_metadata.update((m) => ({ ...m, duration }));
		}}
	/>
{/key}
