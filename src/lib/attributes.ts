import { derived, type Readable } from 'svelte/store';
import { audio_element } from './core/audio-element';
import { audio_metadata, type AudioMetadata } from './core/audio-metadata';
import { seconds_to_timestamp } from './utility';

/**
 * An object representing the attributes of an audio element.
 */
export interface AudioAttributes {
	is_loaded: boolean;
	is_paused: boolean;
	current_time: number;
	duration: number;
	timestamp_current: string;
	timestamp_end: string;
	metadata: AudioMetadata | null;
}

/** A readable Svelte store containing the audio attributes. */
export const audio_attributes: Readable<AudioAttributes> = derived(
	[audio_element, audio_metadata],
	([$el, $meta], set) => {
		if (!$el) {
			return set({
				is_loaded: false,
				is_paused: true,
				current_time: 0,
				duration: 0,
				timestamp_current: seconds_to_timestamp(0),
				timestamp_end: seconds_to_timestamp(0),
				metadata: null,
			} satisfies AudioAttributes);
		}

		set({
			is_loaded: Boolean($el.src),
			is_paused: $el.paused,
			current_time: $el.currentTime,
			duration: $el.duration,
			timestamp_current: seconds_to_timestamp($el.currentTime),
			timestamp_end: seconds_to_timestamp($el.duration),
			metadata: $meta,
		} satisfies AudioAttributes);
	},
);
