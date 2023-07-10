import { persisted } from 'svelte-local-storage-store';
import { get } from 'svelte/store';
import { episode_audio, episode_progress } from '../audio';
import { announce, use_url } from '../utility';

export type UserProgress = {
	[key: string]: number;
};

const default_user_progress = {};
const user_progress_store = persisted<UserProgress>('USER_PROGRESS', default_user_progress);

/**
 * Saves user progress
 */
const save = () => {
	const audio = get(episode_audio);
	if (!audio?.src) return;

	announce.info('saving progress: ', audio.src);

	const pathname = use_url(audio.src).pathname;
	const current_time = get(episode_progress).current_time;
	user_progress_store.update((prev) => ({ ...prev, [pathname]: current_time }));
};

/**
 * Gets user progress for a given audio source
 * @param {string} src - Audio source
 * @returns {number} - User progress for the given audio source
 */
const get_user_progress = (src: string) => {
	const pathname = use_url(src).pathname;
	const store = get(user_progress_store) as UserProgress;

	return store[pathname];
};

/**
 * Clears user progress store
 */
const clear_user_progress = () => user_progress_store.set(default_user_progress);

export const user_progress = {
	/**
	 * Subscribes to user preferences store
	 */
	subscribe: user_progress_store.subscribe,

	get: get_user_progress,
	clear: clear_user_progress,
	save,
};
