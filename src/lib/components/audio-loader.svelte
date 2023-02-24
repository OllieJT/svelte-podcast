<script lang="ts">
	import {
		audio_autoplay,
		audio_current_time,
		audio_duration,
		audio_element,
		audio_ended,
		audio_loading,
		audio_muted,
		audio_paused,
		audio_src,
		audio_start_at,
	} from '$lib/context/audio-internals';
	import { user_preferences } from '$lib/context/user-preferences';
	import type { PlayerElement } from '$lib/types/types';
	import { load_podcast_state } from '$lib/utility/use-state';
	import { onMount } from 'svelte';

	// readonly values
	let element: PlayerElement;
	let current_time = $audio_start_at;
	let duration = 0;
	let ended = true;
	let paused = false;

	// handler values
	let volume = $user_preferences.volume;
	let playbackRate = $user_preferences.playback_rate;
	let muted = false;

	// readonly - stores will update when bindings change
	$: audio_element.set(element);
	$: audio_current_time.set(current_time);
	$: audio_duration.set(duration);
	$: audio_ended.set(ended);
	$: audio_paused.set(paused);

	// handlers - when store value changes, the binding will update the audio element
	$: volume = $user_preferences.volume;
	$: playbackRate = $user_preferences.playback_rate;
	$: muted = $audio_muted;
	$: current_time = $audio_start_at;

	onMount(load_podcast_state);
</script>

<audio
	bind:this={element}
	src={$audio_src}
	autoplay={$audio_autoplay}
	bind:currentTime={current_time}
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
	on:loadeddata={() => audio_loading.set(false)}
	on:loadstart={() => audio_loading.set(true)}
/>
