import { writable } from 'svelte/store';

// TODO: implement autoplay

/**
 * @typedef {Object} AudioState
 * @property {string} src - A path or URL to the audio file
 * @property {number} start_at - The starting point of the audio
 * @property {number} [playback_rate=1] - The playback speed of the audio
 * @property {number} [volume=1] - The volume of the audio
 * @property {boolean} [autoplay=false] - Whether the audio should play as soon as it's loaded
 */

/** @type {import('svelte/store').Writable<AudioState | null>} */
export const audio_state = writable(null);
