import { writable } from 'svelte/store';

/**
 * @typedef {Object.<string, unknown>} AudioMetadata
 */

/**
 * Audio metadata store.
 * @type {import('svelte/store').Writable<AudioMetadata | null>}
 * @description This store holds the metadata for a single audio source.
 */
export const audio_metadata = writable(null);

// console log AudioMetadata
