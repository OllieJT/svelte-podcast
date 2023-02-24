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
		audio_playback_rate,
		audio_src,
		audio_start_at,
		audio_volume,
	} from '$lib/context/audio-internals';
	import { episode_progress } from '$lib/context/episode-progress';
	import { user_preferences } from '$lib/context/user-preferences';
	import type { PlayerElement } from '$lib/types/types';
	import { onMount } from 'svelte';

	// readonly values
	let element: PlayerElement;
	let current_time = $audio_start_at;
	let duration = 0;
	let ended = true;
	let paused = false;

	// handler values
	let volume = $audio_volume;
	let muted = false;
	let playbackRate = 1;

	// readonly - stores will update when bindings change
	$: audio_element.set(element);
	$: audio_current_time.set(current_time);
	$: audio_duration.set(duration);
	$: audio_ended.set(ended);
	$: audio_paused.set(paused);

	// handlers - when store value changes, the binding will update the audio element
	$: volume = $audio_volume;
	$: muted = $audio_muted;
	$: playbackRate = $audio_playback_rate;
	$: current_time = $audio_start_at;

	onMount(() => {
		episode_progress.load_all();
		user_preferences.load();
	});
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
