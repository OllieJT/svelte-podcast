import clamp from 'just-clamp';
import { persisted } from 'svelte-local-storage-store';

export interface UserPreferences {
	playback_rate: number;
	volume: number;
}

/**
 * The default user preferences
 */
const DEFAULT_USER_PREFERENCES: UserPreferences = {
	playback_rate: 1,
	volume: 1,
};

/**
 * The user preferences store
 */
export const USER_PREFERENCES_STORE = persisted<UserPreferences>(
	'USER_PREFERENCE',
	DEFAULT_USER_PREFERENCES,
);

/**
 * Sets the playback rate for the user
 * @param  value - The playback rate value
 */
const set_playback_rate = (value: number) => {
	const playback_rate = clamp(value, 0.5, 5);
	return USER_PREFERENCES_STORE.update((prefs) => ({
		...prefs,
		playback_rate,
	}));
};

/**
 * Sets the volume for the user
 * @param  value - The volume value
 */
const set_volume = (value: number) => {
	const volume = clamp(value, 0, 1);
	return USER_PREFERENCES_STORE.update((prefs) => ({ ...prefs, volume }));
};

/**
 * Clears user preferences store
 */
const clear_store = () => USER_PREFERENCES_STORE.set(DEFAULT_USER_PREFERENCES);

/**
 * The user preferences object
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
