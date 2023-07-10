import { seconds_to_timestamp } from 'svelte-podcast/utility';
import { audio_element } from './audio-element';
import { derived } from 'svelte/store';

/**
 * Episode progress object.
 * @typedef {Object} EpisodeProgress
 * @property {number} current_time - The current time of the episode in seconds.
 * @property {string} timestamp - The current time of the episode in the format 'mm:ss'.
 * @property {boolean} has_ended - Whether the episode has ended or not.
 */

/**
 * The default episode progress object.
 * @type {EpisodeProgress}
 */
const default_episode_progress = {
	current_time: 0,
	timestamp: '00:00',
	has_ended: false,
};

/**
 * The default episode progress object.
 * @type {import('svelte/store').Readable<EpisodeProgress>}
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
});
