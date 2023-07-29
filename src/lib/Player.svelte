<script lang="ts">
	import { onMount } from 'svelte';
	import { AudioProgress, type AudioMetadata } from '.';
	import { use_audio_element } from './_internal_/audio-element';
	import { audio } from './actions';
	import { audio_attributes } from './attributes';
	import { user_preferences } from './user-preferences';
	import { user_progress } from './user-progress';

	onMount(() => use_audio_element('initialise'));

	export let src: string | undefined;
	export let metadata: AudioMetadata = {};

	$: src && audio.src.load(src, metadata || {});
</script>

<slot
	Player={{ Progress: AudioProgress }}
	attributes={$audio_attributes}
	preference={{
		set_playback_rate: user_preferences.set_playback_rate,
		set_volume: user_preferences.set_volume,
		save_progress: user_progress.save,
	}}
	play={audio.play}
	mute={audio.mute}
	seek_to={audio.seek_to}
	skip_by={audio.skip_by}
/>
