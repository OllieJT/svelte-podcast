import clamp from 'just-clamp';
import { persisted } from 'svelte-local-storage-store';
import type { UserPreferences } from '../types';

const default_user_preferences = { playback_rate: 1, volume: 1 };
const user_preferences_store = persisted<UserPreferences>(
	'USER_PREFERENCE',
	default_user_preferences,
);

/**
 * Sets the playback rate for the user
 * @param value - The playback rate value
 * @returns A Promise that resolves with the updated user preferences
 */
const set_playback_rate = (value: number) => {
	const playback_rate = clamp(value, 0.5, 5);
	return user_preferences_store.update((prefs) => ({ ...prefs, playback_rate }));
};

/**
 * Sets the volume for the user
 * @param value - The volume value
 * @returns A Promise that resolves with the updated user preferences
 */
const set_volume = (value: number) => {
	const volume = clamp(value, 0, 1);
	return user_preferences_store.update((prefs) => ({ ...prefs, volume }));
};

/**
 * Clears user preferences store
 */
const clear_store = () => user_preferences_store.set(default_user_preferences);

export const user_preferences = {
	/**
	 * Subscribes to user preferences store
	 */
	subscribe: user_preferences_store.subscribe,

	set_playback_rate,
	set_volume,
	clear: clear_store,
};
