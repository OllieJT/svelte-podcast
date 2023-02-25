import type { UserPreferences } from '$lib/types';
import clamp from 'just-clamp';
import { writable } from 'svelte/store';
import { load_preferences, save_preferences } from './db-local-storage';

const _default_user_preferences = { playback_rate: 1, volume: 1 } satisfies UserPreferences;
const _user_preferences = writable<UserPreferences>(_default_user_preferences);

const clamp_preferences = (prefs: UserPreferences) => ({
	playback_rate: clamp(prefs.playback_rate, 0.5, 5),
	volume: clamp(prefs.volume, 0, 1),
});

const edit = (prefs: Partial<UserPreferences>) => {
	_user_preferences.update((prev) => clamp_preferences({ ...prev, ...prefs }));
	save_preferences();
};

const clear = () => {
	_user_preferences.set(_default_user_preferences);
	save_preferences();
};

export const user_preferences = {
	subscribe: _user_preferences.subscribe,
	edit,
	clear,
	load: load_preferences,
};
