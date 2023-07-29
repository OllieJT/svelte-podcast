import { writable, type Writable } from 'svelte/store';

/**
 * An object representing the state of an audio player.
 */
interface AudioState {
	src: string;
	start_at: number;
	playback_rate?: number;
	volume?: number;
}

/** A writable Svelte store containing the audio state. */
export const audio_state: Writable<AudioState | null> = writable(null);
