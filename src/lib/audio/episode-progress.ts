import { derived, type Readable } from 'svelte/store';
import type { EpisodeProgress } from '../types';
import { seconds_to_timestamp } from '../utility';
import { audio_element } from './audio-element';

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
			timestamp: seconds_to_timestamp($audio.currentTime),
			has_ended: $audio.ended,
		});
	}

	$audio.addEventListener('timeupdate', () => set_value());
	return () => $audio.removeEventListener('timeupdate', () => set_value());
}) satisfies ProgressStore;
