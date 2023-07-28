import clamp from 'just-clamp';
import { persisted } from 'svelte-local-storage-store';

/**
 * @typedef {Object} UserPreferences
 * @property {number} playback_rate - The audio player playback rate (speed)
 * @property {number} volume - The audio player volume
 */

/**
 * The default user preferences
 * @type {UserPreferences}
 */
const DEFAULT_USER_PREFERENCES = { playback_rate: 1, volume: 1 };

/**
 * The user preferences store
 * @type {import('svelte/store').Writable<UserPreferences>}
 */
export const USER_PREFERENCES_STORE = persisted(
	'USER_PREFERENCE',
	DEFAULT_USER_PREFERENCES,
);

/**
 * Sets the playback rate for the user
 * @param {number} value - The playback rate value
 * @returns {void}
 */
const set_playback_rate = (value) => {
	const playback_rate = clamp(value, 0.5, 5);
	return USER_PREFERENCES_STORE.update((prefs) => ({
		...prefs,
		playback_rate,
	}));
};

/**
 * Sets the volume for the user
 * @param {number} value - The volume value
 * @returns {void}
 */
const set_volume = (value) => {
	const volume = clamp(value, 0, 1);
	return USER_PREFERENCES_STORE.update((prefs) => ({ ...prefs, volume }));
};

/**
 * Clears user preferences store
 */
const clear_store = () => USER_PREFERENCES_STORE.set(DEFAULT_USER_PREFERENCES);

/**
 * @typedef {Object} UserPreferencesObject
 * @property {typeof USER_PREFERENCES_STORE.subscribe} subscribe - Subscribes to the user preferences store
 * @property {typeof set_playback_rate} set_playback_rate - Sets the playback rate for the user
 * @property {typeof set_volume} set_volume - Sets the volume for the user
 * @property {typeof clear_store} clear - Clears saved user preferences
 */

/**
 * The user preferences object
 * @type {UserPreferencesObject}
 */
export const user_preferences = {
	/**
	 * Subscribes to user preferences store
	 */
	subscribe: USER_PREFERENCES_STORE.subscribe,

	/**
	 * Sets the playback rate for the user
	 * @type {typeof set_playback_rate}
	 */
	set_playback_rate,

	/**
	 * Sets the volume for the user
	 * @type {typeof set_volume}
	 */
	set_volume,

	/**
	 * Clears user preferences store
	 * @type {typeof clear_store}
	 */
	clear: clear_store,
};
