import { writable, type Writable } from 'svelte/store';
import type { AudioMetadata } from '../metadata';

/** A writable Svelte store containing the audio metadata. */
export const audio_metadata: Writable<AudioMetadata | null> = writable(null);
