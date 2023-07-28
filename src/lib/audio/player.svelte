<script>
	import { AudioPlaybackRate, AudioProgress, audio_attributes } from '.';
	import { audio } from '../audio';
	import { user_preferences } from '../user';

	/** @type {string|undefined} */
	export let src;

	/** @type {import('./audio-metadata').AudioMetadata} */
	export let metadata = {};

	$: src && audio.load(src, metadata || {});

	/**
	 * Skips the audio forward by a specified number of seconds.
	 * @param {number} seconds - The number of seconds to skip forward.
	 */
	const skip_forward = (seconds) => audio.skip(seconds, 'forward');

	/**
	 * Skips the audio backward by a specified number of seconds.
	 * @param {number} seconds - The number of seconds to skip backward.
	 */
	const skip_back = (seconds) => audio.skip(seconds, 'backward');

	/**
	 * Seeks to a specific time in the audio.
	 * @param {number} value - The time to seek to, in seconds.
	 */
	const seek_to = (value) => audio.seek(value);

	/**
	 * Toggles the audio playback between play and pause.
	 */
	const toggle = () => audio.play('toggle');

	/**
	 * Starts playing the audio.
	 */
	const play = () => audio.play('set');

	/**
	 * Pauses the audio.
	 */
	const pause = () => audio.pause('set');
</script>

<slot
	Player={{ Progress: AudioProgress, PlaybackRate: AudioPlaybackRate }}
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
	attributes={$audio_attributes}
/>
