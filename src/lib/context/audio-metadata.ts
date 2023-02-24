import type { AudioMetadata } from '$lib/types';
import { writable } from 'svelte/store';

export const audio_metadata = writable<AudioMetadata | null>(null);
