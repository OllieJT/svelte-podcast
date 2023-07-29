import { persisted } from 'svelte-local-storage-store';
import { get } from 'svelte/store';
import { announce } from './_internal_/announce';
import { audio_element } from './_internal_/audio-element';
import { use_url } from './_internal_/safe-use-url';

export interface UserProgress {
	[key: string]: number;
}

const DEFAULT_USER_PROGRESS: UserProgress = {};

/**
 * User progress store
 */
const USER_PROGRESS_STORE = persisted<UserProgress>(
	'USER_PROGRESS',
	DEFAULT_USER_PROGRESS,
);

/**
 * Saves user progress
 */
const save_user_progress = () => {
	const audio = get(audio_element);
	if (!audio?.src) return;

	announce.info('saving progress: ', audio.src);

	const pathname = use_url(audio.src).pathname;
	const current_time = audio.currentTime;
	USER_PROGRESS_STORE.update((prev) => ({
		...prev,
		[pathname]: current_time,
	}));
};

/**
 * Gets user progress for a given audio source
 * @param  src - Audio source
 */
const get_user_progress = (src: string) => {
	const pathname = use_url(src).pathname;

	const store: UserProgress = get(USER_PROGRESS_STORE);

	const value = store[pathname];

	return value;
};

/**
 * Clears user progress store
 */
const clear_user_progress = () =>
	USER_PROGRESS_STORE.set(DEFAULT_USER_PROGRESS);

export const user_progress = {
	subscribe: USER_PROGRESS_STORE.subscribe,
	get: get_user_progress,
	clear: clear_user_progress,
	save: save_user_progress,
};
