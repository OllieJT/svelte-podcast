<script lang="ts">
	import { user_preferences } from 'svelte-podcast/user';
	import { seconds_to_timestamp } from 'svelte-podcast/utility';
	import { episode_audio, episode_progress } from './audio';
	import { AudioProgress } from './components';

	type WithElement = {
		duration: boolean;
		current_time: boolean;
		playback_rate: boolean;
		skip_back: number;
		skip_forward: number;
	};

	const default_options = {
		duration: false,
		current_time: false,
		playback_rate: false,
		skip_back: 10,
		skip_forward: 10,
	} satisfies WithElement;

	export let include: Partial<WithElement> = {};
	$: options = { ...default_options, ...include };

	$: is_loaded = Boolean($episode_audio?.src);
	$: is_playing = $episode_audio?.is_paused === false;
	$: current_time = options.current_time && ($episode_progress?.current_time || 0);
	$: duration = options.duration && ($episode_audio?.duration || 0);
	$: timestamp_hours = Boolean($episode_audio?.duration && $episode_audio.duration >= 3600);
	$: timestamp = duration && seconds_to_timestamp(duration);

	const seek_to = (value: number) => episode_audio.seek(value);
</script>

<slot
	{AudioProgress}
	set_playback_rate={user_preferences.set_playback_rate}
	set_volume={user_preferences.set_volume}
	skip_forward={() => episode_audio.skip(options.skip_forward, 'forward')}
	skip_back={() => episode_audio.skip(options.skip_back, 'backward')}
	{seek_to}
	toggle_play={() => episode_audio.play('toggle')}
	episode={{
		is_loaded,
		is_playing,
		current_time,
		duration,
		timestamp_hours,
		timestamp,
	}}
/>
