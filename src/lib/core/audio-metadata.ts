import { writable, type Writable } from 'svelte/store';

/**
 * An object representing the metadata for an audio source.
 */
export interface AudioMetadata {
	[key: string]: unknown;
}

/* declare global {
	namespace SveltePodcast {
		interface AudioMetadata {
			[key: string]: unknown;
		}
	}
}

type thing = SveltePodcast.AudioMetadata;

const thing: SveltePodcast.AudioMetadata = { asd: 123 };
thing;
*/

/** A writable Svelte store containing the audio metadata. */
export const audio_metadata: Writable<AudioMetadata | null> = writable(null);
