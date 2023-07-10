<script>
	import { onMount } from 'svelte';
	import { AudioProgress } from '.';
	import { episode_audio, episode_progress } from '../audio';
	import { user_preferences } from '../user';
	import { seconds_to_timestamp } from '../utility';

	/** @type {string|undefined} */
	export let src;

	/** @type {import('../audio/stores').EpisodeDetails} */
	export let metadata = {};

	let mounted = false;

	$: is_loaded = Boolean($episode_audio?.src);
	$: is_playing = $episode_audio?.is_paused === false;
	$: current_time = $episode_progress?.current_time || 0;
	$: duration = $episode_audio?.duration || 0;
	$: timestamp_hours = Boolean($episode_audio?.duration && $episode_audio.duration >= 3600);
	$: timestamp = duration && seconds_to_timestamp(duration);

	onMount(() => {
		if (!src) {
			mounted = true;
			return;
		}

		episode_audio.load(src, metadata || {});
		mounted = true;
	});

	$: mounted && src && episode_audio.load(src, metadata || {});

	/**
	 * Skips the audio forward by a specified number of seconds.
	 * @param {number} seconds - The number of seconds to skip forward.
	 */
	const skip_forward = (seconds) => episode_audio.skip(seconds, 'forward');

	/**
	 * Skips the audio backward by a specified number of seconds.
	 * @param {number} seconds - The number of seconds to skip backward.
	 */
	const skip_back = (seconds) => episode_audio.skip(seconds, 'backward');

	/**
	 * Seeks to a specific time in the audio.
	 * @param {number} value - The time to seek to, in seconds.
	 */
	const seek_to = (value) => episode_audio.seek(value);

	/**
	 * Toggles the audio playback between play and pause.
	 */
	const toggle = () => episode_audio.play('toggle');

	/**
	 * Starts playing the audio.
	 */
	const play = () => episode_audio.play('set');

	/**
	 * Pauses the audio.
	 */
	const pause = () => episode_audio.pause('set');
</script>

<slot
	Player={{ AudioProgress }}
	action={{
		set_playback_rate: user_preferences.set_playback_rate,
		set_volume: user_preferences.set_volume,
		skip_forward,
		skip_back,
		seek_to,
		toggle,
		play,
		pause,
	}}
	episode={{
		is_loaded,
		is_playing,
		current_time,
		duration,
		timestamp_hours,
		timestamp,
	}}
/>
