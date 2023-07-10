import { derived, type Readable } from 'svelte/store';
import { seconds_to_timestamp } from '../../utility';
import { audio_element } from './audio-element';

export type EpisodeProgress = {
	current_time: number;
	timestamp: string;
	has_ended: boolean;
};

const default_episode_progress = {
	current_time: 0,
	timestamp: '00:00',
	has_ended: false,
} satisfies EpisodeProgress;

/**
 * Episode progress store.
 *
 * @returns {Readable<EpisodeProgress>} A Svelte readable store that contains the current progress of the audio episode.
 */
export const episode_progress = derived(audio_element, ($audio, set) => {
	if (!$audio) return set(default_episode_progress);

	/**
	 * Set episode progress value.
	 */
	function set_value() {
		if (!$audio) return;
		set({
			current_time: $audio.currentTime,
			timestamp: seconds_to_timestamp($audio.currentTime),
			has_ended: $audio.ended,
		});
	}

	$audio.addEventListener('timeupdate', () => set_value());

	/**
	 * Remove event listener.
	 */
	return () => $audio.removeEventListener('timeupdate', () => set_value());
}) satisfies Readable<EpisodeProgress>;
