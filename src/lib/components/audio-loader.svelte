<script lang="ts">
	import {
		audio_autoplay,
		audio_current_time,
		audio_element,
		audio_metadata,
		audio_muted,
		audio_playback_rate,
		audio_src,
		audio_start_at,
		audio_volume,
	} from '$lib/context/audio-internals';
	import type { PlayerElement } from '$lib/types/types';
	import { isBoolean, isNumber } from '$pkg/type-guards';

	let element: PlayerElement;
	let currentTime = $audio_start_at;
	let volume = $audio_volume;

	let duration = 0;
	let ended = true;
	let muted = false;
	let paused = false;
	let playbackRate = 1;

	// Update stores based on bindings
	$: audio_element.set(element);
	$: audio_current_time.set(currentTime);
	$: audio_metadata.update((x) => ({ ...x, duration, ended, paused }));

	// Update bindings based on stores
	$: volume = $audio_volume;
	$: muted = $audio_muted;
	$: playbackRate = $audio_playback_rate;
	$: currentTime = $audio_start_at;
</script>

<audio
	bind:this={element}
	src={$audio_src}
	autoplay={$audio_autoplay}
	bind:currentTime
	bind:muted
	bind:duration
	bind:paused
	bind:playbackRate
	bind:volume
	bind:ended
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
