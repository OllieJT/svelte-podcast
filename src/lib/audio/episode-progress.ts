import { audio_element } from '$lib/audio/audio-element';
import type { EpisodeProgress } from '$lib/types';
import { secondsToTimestamp } from '$lib/utility';
import { derived, type Readable } from 'svelte/store';

const default_episode_progress = {
	current_time: 0,
	timestamp: '00:00',
	has_ended: false,
} satisfies EpisodeProgress;

type ProgressStore = Readable<EpisodeProgress>;

export const episode_progress = derived(audio_element, ($audio, set) => {
	if (!$audio) return set(default_episode_progress);

	function set_value() {
		if (!$audio) return;
		set({
			current_time: $audio.currentTime,
			timestamp: secondsToTimestamp($audio.currentTime),
			has_ended: $audio.ended,
		});
	}

	$audio.addEventListener('timeupdate', () => set_value());
	return () => $audio.removeEventListener('timeupdate', () => set_value());
}) satisfies ProgressStore;
