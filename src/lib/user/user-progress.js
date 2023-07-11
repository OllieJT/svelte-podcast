import { persisted } from 'svelte-local-storage-store';
import { get } from 'svelte/store';
import { episode_audio, episode_progress } from '../audio';
import { use_url } from '../utility';
import { announce } from '../internal';

/**
 * User progress object type.
 * This object acts as a dictionary with string keys and number values.
 * @typedef {Object.<string, number>} UserProgress
 */

/**
 * Default user progress object
 * @type {UserProgress}
 */
const DEFAULT_USER_PROGRESS = {};
import {} from 'svelte-local-storage-store';
/**
 * User progress store
 * @type {import('svelte/store').Writable<UserProgress>}
 */
const USER_PROGRESS_STORE = persisted('USER_PROGRESS', DEFAULT_USER_PROGRESS);

/**
 * Saves user progress
 * @function
 * @returns {void}
 */
const save_user_progress = () => {
	const audio = get(episode_audio);
	if (!audio?.src) return;

	announce.info('saving progress: ', audio.src);

	const pathname = use_url(audio.src).pathname;
	const current_time = get(episode_progress).current_time;
	USER_PROGRESS_STORE.update((prev) => ({ ...prev, [pathname]: current_time }));
};

/**
 * Gets user progress for a given audio source
 * @function
 * @param {string} src - Audio source
 * @returns {number|undefined} - User progress for the given audio source, or undefined if not found
 */
const get_user_progress = (src) => {
	const pathname = use_url(src).pathname;

	const store = get(USER_PROGRESS_STORE);

	/**@type {number|undefined} */
	const value = store[pathname];

	return value;
};

/**
 * Clears user progress store
 * @function
 * @returns {void}
 */
const clear_user_progress = () => USER_PROGRESS_STORE.set(DEFAULT_USER_PROGRESS);

/**
 * User progress object
 * @namespace
 * @property {function} subscribe - Subscribes to user progress store
 * @property {function} get - Gets user progress for a given audio source
 * @property {function} clear - Clears user progress store
 * @property {function} save - Saves user progress
 */
export const user_progress = {
	subscribe: USER_PROGRESS_STORE.subscribe,
	get: get_user_progress,
	clear: clear_user_progress,
	save: save_user_progress,
};
