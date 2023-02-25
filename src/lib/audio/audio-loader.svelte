<script lang="ts">
	import {
		_autoplay,
		_current_time,
		_duration,
		_element,
		_ended,
		_loading,
		_muted,
		_paused,
		_src,
		_start_at,
	} from '$lib/audio/_private';
	import { podcast_preferences } from '$lib/preferences';
	import type { AudioPlayerElement } from '$lib/types';
	import { load_podcast_state } from '$lib/utility/use-state';
	import { onMount } from 'svelte';

	// readonly values
	let element: AudioPlayerElement;
	let current_time = $_start_at;
	let duration = 0;
	let ended = true;
	let paused = false;

	// handler values
	let volume = $podcast_preferences.volume;
	let playbackRate = $podcast_preferences.playback_rate;
	let muted = false;

	// readonly - stores will update when bindings change
	$: _element.set(element);
	$: _current_time.set(current_time);
	$: _duration.set(duration);
	$: _ended.set(ended);
	$: _paused.set(paused);

	// handlers - when store value changes, the binding will update the audio element
	$: volume = $podcast_preferences.volume;
	$: playbackRate = $podcast_preferences.playback_rate;
	$: muted = $_muted;
	$: current_time = $_start_at;

	onMount(load_podcast_state);
</script>

<audio
	bind:this={element}
	src={$_src}
	autoplay={$_autoplay}
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
	on:loadeddata={() => _loading.set(false)}
	on:loadstart={() => _loading.set(true)}
/>
